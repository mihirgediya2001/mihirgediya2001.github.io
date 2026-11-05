/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // When built on GitHub Actions for a project page (user.github.io/<repo>),
  // prefix paths with /<repo>. For a user/organization root page
  // (<user>.github.io), leave empty.
  basePath: isGhPages && repo && !repo.endsWith(".github.io") ? `/${repo}` : "",
  assetPrefix: isGhPages && repo && !repo.endsWith(".github.io") ? `/${repo}/` : "",
  env: {
    PORTFOLIO_VARIANT: process.env.PORTFOLIO_VARIANT || "ai",
  },
};
export default nextConfig;
