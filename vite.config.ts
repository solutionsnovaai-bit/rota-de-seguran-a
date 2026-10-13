import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Resolve a URL pública do site para as meta tags de compartilhamento
 * (Open Graph exige endereço absoluto). Na Vercel, o domínio de produção
 * chega sozinho; em outro host, defina VITE_SITE_URL.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.VITE_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  return ''
}

function siteUrlPlugin(): Plugin {
  const siteUrl = resolveSiteUrl()
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl)
    },
  }
}

export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion', 'lenis'],
        },
      },
    },
  },
})
