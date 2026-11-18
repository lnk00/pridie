// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: set `site` once the domain is chosen (needed for canonical URLs and a sitemap).
  vite: {
    plugins: [tailwindcss()],
  },
});
