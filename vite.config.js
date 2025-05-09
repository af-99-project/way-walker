import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy"; // ✅ 추가된 부분
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    copy({
      // ✅ 복사 플러그인 설정
      targets: [{ src: "_headers", dest: "dist" }],
      hook: "writeBundle",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
