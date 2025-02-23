import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Check if running in development environment
const isDevelopment = process.env.NODE_ENV === 'development';

// HTTPS configuration for local development
const getHttpsConfig = () => {
  if (isDevelopment) {
    try {
      return {
        key: fs.readFileSync('../certificates/localhost+2-key.pem'),
        cert: fs.readFileSync('../certificates/localhost+2.pem'),
      };
    } catch (e) {
      console.warn('SSL certificates not found, falling back to HTTP');
      return false;
    }
  }
  return false;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    https: getHttpsConfig(),
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});