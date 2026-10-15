import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { LANDING_PAGES } from './src/data/landingPages';

const escapeAttribute = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), {
      name: 'landing-page-entrypoints',
      enforce: 'post',
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = new URL(req.url || '/', 'http://localhost');
          const slug = url.pathname.replace(/^\/+|\/+$/g, '');
          if (LANDING_PAGES.some(page => page.slug === slug)) {
            req.url = `/${slug}/index.html${url.search}`;
          }
          next();
        });
      },
      generateBundle(_options, bundle) {
        const entry = bundle['index.html'];
        if (!entry || entry.type !== 'asset') throw new Error('Missing index.html entry');
        // Each public URL gets its own initial metadata, even before JavaScript runs.
        for (const page of LANDING_PAGES) {
          const title = escapeAttribute(`${page.title} | PureTech Innovations`);
          const description = escapeAttribute(page.description);
          const html = String(entry.source)
            .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
            .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
            .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
            .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`);
          this.emitFile({ type: 'asset', fileName: `${page.slug}/index.html`, source: html });
        }
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
