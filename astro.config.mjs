import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wider.memoriastudio.net',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), compress(), sitemap()],
});
