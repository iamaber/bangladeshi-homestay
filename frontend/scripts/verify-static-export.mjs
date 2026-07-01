import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("out");
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath =
  configuredBasePath === "/"
    ? ""
    : configuredBasePath.replace(/\/+$/, "");

if (basePath && !basePath.startsWith("/")) {
  throw new Error(
    `NEXT_PUBLIC_BASE_PATH must be empty or start with "/": ${configuredBasePath}`,
  );
}

const requiredRoutes = [
  "/",
  "/about",
  "/booking",
  "/contact",
  "/faq",
  "/hosts",
  "/hosts/featured-host-family",
  "/hosts/future-host-family",
  "/hosts/seasonal-host-family",
  "/how-it-works",
  "/packages",
  "/privacy",
  "/terms",
];

const textExtensions = new Set([".css", ".html", ".js", ".txt"]);
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function routeCandidates(route) {
  const relativePath = decodeURIComponent(route)
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  if (!relativePath) {
    return [path.join(outputDir, "index.html")];
  }

  return [
    path.join(outputDir, relativePath),
    path.join(outputDir, relativePath, "index.html"),
  ];
}

async function exists(candidate) {
  try {
    return (await stat(candidate)).isFile();
  } catch {
    return false;
  }
}

async function findTarget(route) {
  for (const candidate of routeCandidates(route)) {
    if (await exists(candidate)) {
      return candidate;
    }
  }
  return null;
}

function isExternal(value) {
  return /^(?:[a-z]+:|\/\/)/i.test(value);
}

let files;
try {
  files = await walk(outputDir);
} catch {
  throw new Error('Static export directory "out" does not exist. Run "npm run build" first.');
}

const doubledBasePath = basePath ? `${basePath}${basePath}` : "";

for (const file of files) {
  const extension = path.extname(file);
  if (!textExtensions.has(extension)) {
    continue;
  }

  const content = await readFile(file, "utf8");
  const displayPath = path.relative(process.cwd(), file);

  if (doubledBasePath && content.includes(doubledBasePath)) {
    errors.push(`${displayPath}: contains doubled base path "${doubledBasePath}"`);
  }

  if (extension !== ".html") {
    continue;
  }

  for (const match of content.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const [, attribute, value] = match;

    if (!value || value.startsWith("#") || isExternal(value)) {
      continue;
    }

    if (!value.startsWith("/")) {
      errors.push(`${displayPath}: contains non-root-relative URL "${value}"`);
      continue;
    }

    if (basePath && value !== basePath && !value.startsWith(`${basePath}/`)) {
      errors.push(`${displayPath}: URL is missing base path: "${value}"`);
      continue;
    }

    const parsedUrl = new URL(value, "https://static-export.test");
    const withoutBasePath = basePath
      ? parsedUrl.pathname.slice(basePath.length) || "/"
      : parsedUrl.pathname;
    const target = await findTarget(withoutBasePath);

    if (!target) {
      errors.push(`${displayPath}: target does not exist for "${value}"`);
      continue;
    }

    if (attribute === "href" && parsedUrl.hash && target.endsWith(".html")) {
      const targetHtml = await readFile(target, "utf8");
      const anchor = decodeURIComponent(parsedUrl.hash.slice(1));
      const escapedAnchor = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      if (!new RegExp(`\\bid="${escapedAnchor}"`).test(targetHtml)) {
        errors.push(`${displayPath}: anchor does not exist for "${value}"`);
      }
    }
  }
}

for (const route of requiredRoutes) {
  if (!(await findTarget(route))) {
    errors.push(`Required exported route is missing: "${route}"`);
  }
}

if (errors.length > 0) {
  console.error("Static export verification failed:\n");
  for (const error of [...new Set(errors)]) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Static export verified: ${files.length} files, base path "${basePath || "/"}".`,
);
