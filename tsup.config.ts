import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  target: 'node18',
  format: ['esm'],
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  bundle: true,
  tsconfig: 'tsconfig.build.json',
  platform: 'node',
  shims: true,
  external: ['@prisma/client', '.prisma/client']
})
