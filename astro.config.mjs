import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import vercel from '@astrojs/vercel/server';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), compress()],
  adapter: vercel(),
  output: 'server',
});
