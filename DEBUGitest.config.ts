/// <reference types="vitest" />
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        Vue(),
    ],
    test: {
        global: true,
        environment: 'happy-dom',
        coverage: {
            enabled: true,
            excludeNodeModules: true,
            // include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            clean: true,
            exclude: ['node_modules', 'tests', 'coverage'],
            skipFull: false,
            reporter: ['text'],
            /* reporter: [
                'clover',
                'json-summary',
                'text',
                'html',
            ], */
        },
    },
});
