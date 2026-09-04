// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://inoxhungoanh.com',
  trailingSlash: 'always',
  integrations: [sitemap(), icon({ iconDir: 'src/icons' })],
  vite: {
    plugins: [tailwindcss()],
  },
});
