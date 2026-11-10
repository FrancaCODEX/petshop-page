# Bicho & Afeto — demonstração reutilizável

Landing page demonstrativa sem vínculo com uma empresa real. O repositório original continha apenas um README; a estrutura foi criada com o scaffold oficial create-vinext-app.

## Stack e direção visual

TypeScript, React, App Router com APIs Next.js, Tailwind CSS 4 e Vinext, executado no Cloudflare Workers. Vinext reimplementa as APIs do Next.js sobre Vite; este projeto usa o scaffold oficial Vinext, não o runtime next. A documentação da Cloudflare de 05/11/2026 o recomenda para novos projetos Next.js: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/

Creme, verde profundo, coral e amarelo, títulos serifados expressivos, fotografias locais WebP e detalhes gráficos discretos. Sem fontes externas ou biblioteca de componentes. O único componente interativo é o cabeçalho móvel.

## Preview publicado

https://demo-petshop-demo-preview.vfranca-dev.workers.dev

PR: https://github.com/FrancaCODEX/petshop-page/pull/1

Somente o preview `demo` está publicado. O Worker pai não possui implantação de produção e seu endereço workers.dev está desativado.

## Rodar localmente

Requer Node.js 24.22+ e npm.

```sh
npm ci
npm run dev
```

Abra a URL Local impressa pelo Vite (normalmente http://localhost:5173). Para conferir a compilação:

```sh
npm run typecheck
npm run build
npm run start
```

## Personalizar

Edite `config/business.ts`: nome, tagline, apresentação, título do hero, endereço completo, horários, telefone, WhatsApp (DDI + DDD + número), redes sociais, imagens, serviços, categorias e avaliações.

- `demo: true` exibe os avisos de demonstração. Antes de desativar, aprove todos os textos e troque a tagline demonstrativa.
- Campos vazios não criam canais fictícios. Sem WhatsApp, CTAs levam à explicação de contato pendente; sem endereço, não há link de mapa. O link Google Maps é gerado com o endereço preenchido e codificado.
- Serviços e categorias têm `provisional` individual. Confirme oferta, descrição e disponibilidade antes de alterar esse campo.
- `products.enabled: false` oculta produtos e remove o item da navegação.
- Avaliações ficam ocultas por padrão. Adicione apenas avaliações reais, autorizadas, verificáveis, com nome, texto, URL original HTTPS e `approved: true`.
- Substitua fotos por imagens autorizadas. Não existem fotos ou alegações sobre uma loja real.
- Metadados usam a configuração. O preview permanece com `noindex,nofollow`.
- Não há formulário, preços, notas, horários, promessas, marcas ou estoque inventados.

## Cloudflare: somente preview

Configuração oficial em `cloudflare.config.ts` e `vite.config.ts`, sem credenciais. `scripts/preview-build.mjs` prepara Build Output de preview e `npm run preview:deploy` publica um Worker Preview isolado chamado `demo`.

```sh
npx cf auth login
npm run preview:deploy
```

O login é local e nunca deve ser versionado. O primeiro preview pode criar o Worker pai como contêiner, sem implantação de produção. Não configure domínio personalizado nem use `cf deploy` para este demo. O conector autenticado foi usado na sessão de implementação sem exportar sua credencial.

## Arquivos principais

- `app/page.tsx`, `app/layout.tsx`, `app/globals.css`: página, metadados, estilos e responsividade.
- `components/header.tsx`, `components/icon.tsx`: menu acessível e ícones SVG.
- `config/business.ts`: toda a personalização comercial.
- `public/images/`: fotos WebP provisórias, fontes em `ASSETS.md`.
- `cloudflare.config.ts`, `vite.config.ts`, `scripts/preview-build.mjs`: build e preview Cloudflare.
- `package.json`, `package-lock.json`, `tsconfig.json`, `postcss.config.mjs`, `next.config.ts`, `.gitignore`: configuração e dependências.

## Dados pendentes de aprovação

Nome e identidade definitiva; texto institucional; serviços reais e suas descrições; categorias efetivamente oferecidas; endereço; horários; telefone/WhatsApp; redes sociais; fotos autorizadas da loja e serviços. Avaliações são opcionais e só devem ser adicionadas com autorização e fonte verificável.

## Duas demonstrações da Pet’s Family

- Original clara: https://demo-petshop-demo-preview.vfranca-dev.workers.dev/pet-family
- Alternativa escura e dourada: https://demo-petshop-demo-preview.vfranca-dev.workers.dev/pet-family-dark
- Demonstração genérica preservada em `/`.

A versão clara foi restaurada integralmente de `claude/pet-family-demo`, commit `1970dc0`, incluindo página, estilos e configuração. Personalize em `config/pet-family.ts`. A alternativa escura usa `config/pet-family-dark.ts` e estilos isolados com prefixo `pfd-`. Ambas continuam demonstrações independentes e mantêm contatos ausentes e atendimento 24h como dados pendentes de confirmação.
