import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import React from 'react';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-tic-tac-toe/',
  plugins: [react()],

  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@public': path.resolve(__dirname, './public'),
    },
  },
});
