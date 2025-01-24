import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  root: '.',
  base: '/',
  build: {
    outDir: 'server_dist',
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'server/server.tsx',
      },
      external: ['fsevents'],
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
