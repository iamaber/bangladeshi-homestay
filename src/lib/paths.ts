const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prefixes files from /public for deployments below a repository path.
 * Internal navigation must use next/link with an unprefixed app route.
 */
export function assetPath(path: string) {
  return `${basePath}${path}`;
}
