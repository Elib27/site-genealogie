import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.estienne-genealogie.fr',
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), compress()]
});