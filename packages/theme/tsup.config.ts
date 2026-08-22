import { defineConfig } from 'tsup';

export default defineConfig([
  // ── Root entry (tokens + ThemeProvider) ──
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    clean: true,
    outDir: 'dist',
    sourcemap: true,
    platform: 'neutral',
    external: ['react', 'react-dom', 'antd'],
    // tsup 会把 modal.css 抽成 dist/index.css，需在 JS 入口保留 side-effect import
    banner: {
      js: "import './index.css';",
    },
  },
  // ── Token generation script ──
  {
    entry: { generate: 'src/tokens/generate.ts' },
    format: ['esm'],
    dts: false,
    clean: false,
    outDir: 'scripts',
    sourcemap: false,
    platform: 'node',
    external: [],
  },
]);
