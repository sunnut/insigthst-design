import path from "path"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // docs 使用 BrowserRouter，必须使用站点根路径作为静态资源基准。
  // 使用 './' 时，从 /components/button 等深层路由刷新会把
  // /assets/* 解析成 /components/assets/*，导致入口脚本和懒加载 chunk 404。
  base: '/',
  plugins: [react(), svgr()],
  server: {
    port: 3001,
    host: '0.0.0.0',
  },
  preview: {
    port: 3001,
    host: '0.0.0.0',
  },
  resolve: {
    alias: [
      // 子路径须先于包名 alias，否则 tokens.css 会被错误解析到 src/index.ts/tokens.css
      {
        find: '@insightst-design/theme/tokens.css',
        replacement: path.resolve(__dirname, '../../packages/theme/dist/tokens.css'),
      },
      {
        find: '@insightst-design/theme/index.css',
        replacement: path.resolve(__dirname, '../../packages/theme/dist/index.css'),
      },
      {
        find: '@insightst-design/theme',
        replacement: path.resolve(__dirname, '../../packages/theme/src/index.ts'),
      },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
});
