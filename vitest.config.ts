import { defineConfig } from 'vitest/config';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [viteTsconfigPaths()],
	test: {
		globals: true,
		setupFiles: ['./setup.vitest.ts'],
		environment: 'jsdom',
	},
});