import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), compress()],
  output: 'server',
  server: {
    host: true, // Esto le dice a Astro que escuche en 0.0.0.0 (todas las IPs de red)
    port: 4321, // Opcional, pero asegura que use el puerto 4321
  }
});
