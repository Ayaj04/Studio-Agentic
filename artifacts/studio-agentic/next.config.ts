import type { NextConfig } from 'next';

function normalizeBasePath(value: string | undefined): string | undefined {
  if (!value || value === '/') return undefined;
  const path = value.startsWith('/') ? value : `/${value}`;
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

const basePath = normalizeBasePath(process.env.BASE_PATH);

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
