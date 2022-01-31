/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Kita-Tests',
        short_name: 'Kita-Tests',
        description: 'Prevent Papers',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // include: ['src/**/*.js'],
    // exclude: ['src/api.js', 'node_modules'],
    deps: {
      // inline: ['@vue', '@vueuse'],
      // inline: ['@vue', '@vueuse', 'firebase/auth', 'firebase/app', 'firebase/firestore'],
    },
    coverage: {
      enabled: true,
      excludeNodeModules: true,
      // include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      clean: true,
      // exclude: ['node_modules', 'tests', 'coverage', 'src/api.js'],
      skipFull: false,
      // reporter: ['text'],
      /* reporter: [
          'clover',
          'json-summary',
          'text',
          'html',
      ], */
    },
  },
});
