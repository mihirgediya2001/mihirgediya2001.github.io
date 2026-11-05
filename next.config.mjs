/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === "true";
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "/").split("/");
// User/organization root page only when repo === "<owner>.github.io". Everything
// else is a project page served under /<repo>/.
const isUserPage = repo === `${owner}.github.io`;
const basePath = isGhPages && repo && !isUserPage ? `/${repo}` : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    PORTFOLIO_VARIANT: process.env.PORTFOLIO_VARIANT || "ai",
  },
};
export default nextConfig;
