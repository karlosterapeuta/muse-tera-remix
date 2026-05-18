import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

// Deploy target: Netlify. We disable the Cloudflare plugin (provided by the
// Lovable wrapper by default) and add the official Netlify adapter for
// TanStack Start, which produces a Netlify Function for SSR.
export default defineConfig({
  cloudflare: false,
  plugins: [netlify()],
  tanstackStart: {
    server: { entry: "server" },
  },
});
