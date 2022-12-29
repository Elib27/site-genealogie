import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), compress()]
});