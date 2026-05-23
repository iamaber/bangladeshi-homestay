export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string) {
  if (!basePath || path.startsWith("http") || path.startsWith("mailto:")) {
    return path;
  }

  if (path.startsWith("#")) {
    return path;
  }

  return `${basePath}${path}`;
}
