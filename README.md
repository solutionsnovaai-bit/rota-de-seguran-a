# Rota de Segurança

Página de vendas do guia **Rota de Segurança**, de Sonia Samudio.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion (animações) + Lenis (scroll suave)
- Fontes locais: Archivo, Inter e Instrument Serif

## Rodar localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. O framework (Vite) é detectado sozinho — o `vercel.json` já define o build e a pasta `dist`.
3. Variáveis opcionais (veja `.env.example`):
   - `VITE_SITE_URL` — domínio final, usado nas prévias de compartilhamento (na Vercel o domínio de produção já é detectado).
   - `VITE_META_PIXEL_ID` — ID do Pixel da Meta; em branco, nenhum rastreamento é carregado.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Textos de cada seção | `src/content/*.ts` |
| Link do checkout | `src/content/site.ts` |
| Cores, fontes e tamanhos | `tailwind.config.ts` |
| Imagens | `src/assets/` |
| Seções da página | `src/sections/` |
| Componentes de animação | `src/components/motion/` |

Os parâmetros de campanha da visita (`utm_*`, `src`, `sck`, `fbclid`, `gclid`) são repassados automaticamente para o checkout.
