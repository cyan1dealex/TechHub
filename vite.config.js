import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsDir: 'assets', // Убедитесь, что это указано

    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})