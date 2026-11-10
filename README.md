# Bicho & Afeto — demonstração reutilizável

Landing page demonstrativa sem vínculo com uma empresa real. O repositório original continha apenas um README; a estrutura foi criada com o scaffold oficial create-vinext-app.

## Stack e direção visual

TypeScript, React, App Router com APIs Next.js, Tailwind CSS 4 e Vinext, executado no Cloudflare Workers. Vinext reimplementa as APIs do Next.js sobre Vite; este projeto usa o scaffold oficial Vinext, não o runtime next. A documentação da Cloudflare de 05/11/2026 o recomenda para novos projetos Next.js: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/

Creme, verde profundo, coral e amarelo, títulos serifados expressivos, fotografias locais WebP e detalhes gráficos discretos. Sem fontes externas ou biblioteca de componentes. O único componente interativo é o cabeçalho móvel.

## Preview publicado

https://demo-petshop-demo-preview.vfranca-dev.workers.dev

PR: https://github.com/FrancaCODEX/petshop-page/pull/1

Somente o preview `demo` está publicado. O Worker pai não possui implantação de produção e seu endereço workers.dev está desativado.

## Rota /pet-family — demonstração para a Pet’s Family

Página independente em `/pet-family`, no mesmo projeto e no mesmo deploy da demonstração genérica (`/`), que não foi alterada.

- Conteúdo: `config/pet-family.ts`. Dados vindos do perfil `@familypet1`, ainda não confirmados pela equipe.
- Página e estilos: `app/pet-family/page.tsx` e `app/pet-family/pet-family.css` (tudo dentro de `.pf`, sem afetar `/`).
- Sem número de WhatsApp confirmado, o botão de WhatsApp fica desativado e sem link; o contato funcional é o Instagram.
- O atendimento 24 horas aparece atribuído ao perfil e marcado "a confirmar" até `clinic.open24h.confirmed` virar `true`.
- Fotos: as mesmas imagens ilustrativas de `public/images/`, identificadas como ilustrativas.
- `demo: true` mantém a faixa de demonstração e os avisos. Não é o site oficial da Pet’s Family.

A confirmar com a equipe: WhatsApp e telefone, endereço, atendimento 24 horas, condições da entrega (regiões, taxas, horários), texto do "Sobre" e fotos autorizadas.

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
