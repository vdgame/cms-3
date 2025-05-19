// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server', // 启用 SSR 模式
  integrations: [
    tailwind(),
    react(),
  ],
  adapter: netlify(),
});
