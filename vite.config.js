import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function githubPagesBase() {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  return repo ? `/${repo}/` : "/";
}

export default defineConfig({
  base: githubPagesBase(),
  plugins: [react()],
});
