// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/TechHub/',
    build: {
        outDir: 'dist',   // Папка сборки (по умолчанию 'dist')
        emptyOutDir: true,    // Очищать папку перед сборкой
    },
    server: {
        open: true,
    },
})