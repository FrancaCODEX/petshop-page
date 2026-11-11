# PetAmigo

Landing page completa em **React + TypeScript + Vite**, construída a partir da **home central** da referência fornecida. A prancha, as miniaturas de páginas internas e as molduras não fazem parte da interface.

## Executar

Recomendado: Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite, normalmente `http://localhost:5173`.

```sh
npm run build
npm run preview
```

O build estático fica em `dist/`. Para hospedagem na raiz de um domínio, publique essa pasta. Em um subdiretório (como GitHub Pages de projeto), configure o `base` do Vite e os caminhos de assets antes do deploy. Não há dependência de variáveis de ambiente nem de serviços externos.

## O que está pronto

- Cabeçalho e menu mobile, hero com cão e gato, benefícios e seis serviços.
- Quatro produtos da referência, filtro por categoria, detalhes e sacola demonstrativa com quantidades e remoção.
- Clube PetAmigo, comparação antes/depois com mouse, toque e teclado, e depoimento de Carla M., tutora do Thor.
- Luna, apresentação e formulário de interesse; quatro artigos com conteúdo educativo; localização e contato; rodapé.
- Formulários com validação por campo, revisão local, foco no primeiro erro e avisos claros de demonstração.
- Modais com foco contido, fechamento por Escape e retorno ao controle de origem; foco visível e redução de movimento.
- Layouts específicos para celular, tablet e desktop, fontes locais e cópias WebP otimizadas.

## Limitações reais

**Não existe backend.** Formulários não enviam dados. Não há reservas, pagamentos, pedidos, contratos de assinatura ou adoções concluídas. A sacola vive apenas na memória e é apagada ao recarregar. Não há login, área de cliente, disponibilidade ou estoque reais.

Endereço, telefone, e-mail, horários, imagens, produtos, preços, Luna e o depoimento vêm da referência de design. Os contatos e o mapa são apresentados como ilustrativos; precisam ser confirmados pelo negócio antes de uma publicação comercial. Os artigos foram desenvolvidos para a demonstração a partir dos temas da referência e não substituem orientação veterinária. Antes de operar comercialmente, confirme também direitos de uso das imagens, especificações dos produtos e regras do clube.

## Verificação e capturas

```sh
# Em um terminal:
npm run dev
# Em outro:
npx playwright install chromium  # necessário apenas se não houver Chromium local
npm run test:e2e
npm run capture
```

`CHROMIUM_PATH` permite escolher um executável. `BASE_URL` permite testar outro servidor, por exemplo `BASE_URL=http://localhost:4173 npm run test:e2e` após build/preview.

Testes em Chromium nas larguras **390, 768, 1024 e 1440 px**, mais verificação de overflow em 320 px. A suíte cobre navegação, campos inválidos e válidos, ausência de envios reais, produtos, limites da sacola, adoção, artigos, contato, teclado, redução de movimento, console, assets e auditoria automatizada axe. O comparador também foi testado com gestos de toque sintetizados via CDP, incluindo rolagem vertical. Dispositivos físicos, Safari e Firefox não foram testados.

- [Captura desktop](screenshots/desktop-full.webp)
- [Captura mobile](screenshots/mobile-full.webp)
- [Hero desktop](screenshots/desktop-hero.webp)
- [Hero mobile](screenshots/mobile-hero.webp)
- [Relatório de verificação](docs/verification-results.json)
- [Notas de revisão e ferramentas](docs/REVIEW.md)

## Organização

```text
src/components/  Seções, formulários e componentes compartilhados
src/data.ts      Conteúdo dos serviços, produtos e artigos
src/tokens.css   Paleta, fontes, raios e escala de espaçamento
src/styles.css   Layouts, estados, breakpoints e redução de movimento
public/assets/   Cópias otimizadas para a web, com fontes WOFF2
scripts/         Testes, capturas e otimização reproduzível dos assets
screenshots/     Capturas finais
```

Os dois ZIPs foram reunidos em `originals/petamigo/` no workspace, preservando seus arquivos sem alterações. Essa cópia de aproximadamente 60 MB é ignorada pelo Git para manter o repositório leve. O pacote completo de entrega local inclui esses originais. Não são usados como fundo nem como substituto da interface.

## Referências de design

A identidade PetAmigo prevalece sobre defaults das skills. Foram lidas e aplicadas orientações de **design-taste-frontend**, **Impeccable** (new-work, craft-floor, adapt, animate, audit, polish), apresentação de sites, React e verificação. Fontes, versões, referências e exceções estão em `docs/REVIEW.md`.

O **ImageCompare da Arc**, consultado no **21st.dev**, orientou a interação do antes/depois. Foi adaptado para um range nativo, CSS e React, mantendo toque, teclado e leitura acessível e dispensando a dependência de animação do original. A licença MIT consultada está em `docs/arc-image-compare-LICENSE.txt`.
