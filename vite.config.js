/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
    build: {
        target: 'esnext',
    },
    plugins: [react()],
    resolve: {
        alias: {
            src: resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        host: true
    }
});
