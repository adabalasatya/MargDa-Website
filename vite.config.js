import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define the `global` object for browser environments
    global: {},
  },
  resolve: {
    // Optional: Add a fallback for the `global` object if needed
    alias: {
      global: 'global/window', // or use a polyfill like 'global-browserify'
    },
  },
});