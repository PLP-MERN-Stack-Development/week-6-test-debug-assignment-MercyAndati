import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // optional since it's default
  build: {
    outDir: 'dist',
  },
});
