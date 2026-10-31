# Tavares Pranviatmann — site de fotografia

Manual de edição, manutenção e publicação do site de Tavares Pranviatmann, fotógrafo em Santos — SP. Feito para iniciantes e futuros desenvolvedores.

> **Atenção:** este repositório usa React, TanStack Start e Nitro. Não presuma que seja um site estático tradicional nem escolha uma pasta de saída de deploy sem conferir a configuração real.

## Índice
1. [Sobre e tecnologias](#1-sobre-e-tecnologias)
2. [Estrutura de arquivos](#2-estrutura-de-arquivos)
3. [Executar localmente](#3-executar-localmente)
4. [Editar pelo GitHub ou VS Code](#4-editar-pelo-github-ou-vs-code)
5. [Editar conteúdo](#5-editar-conteúdo)
6. [Galeria e imagens](#6-galeria-e-imagens)
7. [Usar IA para ajudar](#7-usar-ia-para-ajudar)
8. [Publicar na Cloudflare](#8-publicar-na-cloudflare)
9. [Domínio próprio](#9-domínio-próprio)
10. [Backup, testes e problemas comuns](#10-backup-testes-e-problemas-comuns)
11. [Referência técnica](#11-referência-técnica)

## 1. Sobre e tecnologias

O repositório contém o código-fonte. O fluxo recomendado é: backup → editar → testar → revisar diff → commit/push → conferir o deploy.

O endereço temporário conhecido é https://pranviatmann.vercel.app. O domínio próprio ainda não foi comprado.

| Tecnologia | Uso |
| --- | --- |
| React 19 | Interface baseada em componentes |
| TypeScript | Tipos e prevenção de erros |
| TanStack Start / Router | Estrutura da aplicação e rotas |
| Vite 8 | Desenvolvimento e build |
| Tailwind CSS 4 | Estilos |
| Lucide React | Ícones |
| Git/GitHub | Histórico e colaboração |
| Cloudflare | Hospedagem pretendida |

Consulte `package.json` antes de alterar dependências.

## 2. Estrutura de arquivos

| Caminho | Conteúdo |
| --- | --- |
| `src/routes/index.tsx` | Página principal: textos, serviços, avaliações, FAQ, contatos e SEO |
| `src/data/gallery.ts` | Categorias, fotos, miniaturas e textos alt |
| `src/components/` | Componentes reutilizáveis: logo, cartões e visualizador |
| `public/images/` | Imagens acessadas por caminhos como `/images/foto.webp` |
| `src/assets/` | Recursos importados diretamente pelo código |
| `package.json` | Dependências e scripts |
| `vite.config.ts` | Configuração Vite/TanStack/Nitro |
| `README.md` | Este manual |

Para uma mudança simples, localize primeiro o dado ou texto específico; não altere um componente inteiro sem necessidade.

## 3. Executar localmente

### Instalações
É necessário computador, Node.js compatível com o projeto, npm, Git e, recomendado, VS Code. Confira:

```bash
node -v
npm -v
git --version
```

### Baixar e instalar

```bash
git clone https://github.com/stoianmurilo24-ops/pranviatmann.git
cd pranviatmann
npm install
```

Não apague `package-lock.json` sem motivo.

### Iniciar

```bash
npm run dev
```

Abra o endereço que aparecer no terminal (por exemplo, `http://localhost:3000` ou `http://localhost:5173`). Pare com **Ctrl + C**.

### Build e prévia

```bash
npm run build
npm run preview
```

A build não publica o site. A saída depende da configuração TanStack Start/Nitro; use o endereço local informado pelo preview.

## 4. Editar pelo GitHub ou VS Code

### Pelo GitHub
Para pequenas correções:
1. Abra o [repositório](https://github.com/stoianmurilo24-ops/pranviatmann).
2. Abra o arquivo e use o lápis de edição, se disponível.
3. Localize o texto e mude somente o trecho necessário.
4. Preserve aspas, vírgulas, chaves e tags.
5. Revise o diff e faça commit com mensagem clara.
6. Aguarde o deploy e teste o site.

Editar código pelo navegador não substitui o teste local; mudanças estruturais devem ser testadas no computador.

### Pelo VS Code
Abra a pasta do projeto no VS Code (Arquivo → Abrir pasta). Use **Ctrl + Shift + F** para buscar texto em todos os arquivos. Salve com **Ctrl + S** e confira a mudança no navegador local.

Antes de publicar, confira:

```bash
git status
git diff
npm run build
```

Depois de revisar:

```bash
git add .
git commit -m "Descreve a alteração"
git push
```

`git add .` inclui todas as alterações locais. Se não quiser incluir tudo, selecione arquivos individualmente.

## 5. Editar conteúdo

Os exemplos refletem a estrutura atual; procure o trecho antes de alterar.

### Título, apresentação e Sobre
Em `src/routes/index.tsx`, procure textos como “Registros que contam histórias”, “Transformo momentos únicos…” e “Sou o Tavares…”. Troque somente o conteúdo textual e preserve a sintaxe.

### Serviços
Procure a constante `services`. Cada linha representa título, descrição, imagem e id da categoria:

```tsx
// [título, descrição, imagem do card, id da categoria]
const services = [
  ["Casamentos", "Amor em cada detalhe.", "/images/p2.png", "casamentos"],
];
```

Ao criar serviço, confirme que o id existe em `src/data/gallery.ts`. Não invente serviços ou promessas sem aprovação.

### Avaliações e FAQ
Procure `reviews` e `faqs` no mesmo arquivo. Avaliações devem ser reais e autorizadas; não invente depoimentos, nomes ou estrelas. Mantenha respostas do FAQ verdadeiras, especialmente prazo, disponibilidade e serviços.

### WhatsApp e Instagram
No início de `src/routes/index.tsx`:

```tsx
const WA = "https://wa.me/5513991158252";
const IG = "https://www.instagram.com/pranviatmann";
```

Confirme o número e o perfil com o proprietário antes de trocar. O WhatsApp usa formato internacional, apenas números, sem espaços ou símbolos. A constante `WA` é reutilizada nos botões e no rodapé.

### SEO e compartilhamento
Na configuração `head`, procure `title`, `description`, `og:title`, `og:description` e imagens de compartilhamento. Use informações verdadeiras e imagens existentes. Se mudar o domínio, revise URLs absolutas antigas. SEO não garante posição no Google.

### Logo, cores e visual
Os componentes estão em `src/components/`; estilos usam principalmente classes Tailwind. Localize a classe/componente, faça uma alteração limitada e teste contraste, foco, celular e desktop. Não faça redesign não solicitado. Antes de trocar logo, confira como o componente `Logo` carrega o recurso.

## 6. Galeria e imagens

### Adicionar foto
1. Confirme autorização de uso.
2. Use nome simples, sem espaços/acentos, como `ensaio-jardim-01.webp`.
3. Coloque em `public/images/`.
4. Edite `src/data/gallery.ts` e adicione à categoria certa.
5. Informe caminho iniciado em `/images/` e texto alt descritivo.
6. Teste miniatura e foto aberta.

Exemplo:

```ts
{ src: "/images/ensaio-jardim-01.webp", alt: "Retrato em um jardim" }
```

Alt descreve a foto; não é para empilhar palavras-chave. Imagem decorativa pode usar alt vazio se apropriado.

### Categorias e prévias
Cada categoria contém:
- `id`: identificador técnico único;
- `label`: nome visível;
- `photos`: fotos cadastradas.

Os cartões mostram até três fotos de prévia; ao abrir, a categoria mostra todas as fotos. Categorias vazias não aparecem como ativas. Ao adicionar categoria, use id único e confirme a ligação com o serviço. Ao remover foto, procure referências e caminhos quebrados.

WebP costuma ser adequado para fotografias comprimidas; PNG pode servir para transparência. Preserve originais fora da pasta de build e confira cortes em celular e desktop. A lógica de cartões com uma, duas ou três fotos fica em `src/routes/index.tsx`; teste os três cenários se alterar o layout.

## 7. Usar IA para ajudar

IA pode analisar código, sugerir textos e implementar mudanças, mas pode errar. Faça backup, peça inspeção antes de editar, revise o diff e teste. Você pode usar ChatGPT, Claude ou outra ferramenta capaz de ler os arquivos. Se não tiver acesso ao repositório, forneça os arquivos; não presuma acesso automático ao GitHub.

### Prompt base: analisar antes de mexer

```text
Você é um desenvolvedor experiente em React, TypeScript, TanStack Start, Vite e Tailwind CSS.

Analise o projeto antes de alterar qualquer coisa:
1. Identifique os arquivos envolvidos.
2. Explique como a parte funciona em linguagem simples.
3. Aponte riscos e dependências.
4. Apresente um plano curto.

Não implemente ainda. Não invente conteúdo, imagens, serviços, avaliações, contatos ou informações do cliente. Preserve design e comportamento existentes, exceto o que eu pedir explicitamente.
```

### Prompt: revisar textos

```text
Revise os textos do site em português brasileiro. Localize os trechos e mostre sugestões primeiro. Preserve sentido e informações. Não invente fatos, preços, prazos, serviços ou promessas. Após minha aprovação, altere somente os textos necessários e informe os arquivos modificados.
```

### Prompt: fotos e galeria

```text
Inspecione src/data/gallery.ts, os componentes da galeria e public/images. Explique como miniaturas e álbum funcionam. Use somente imagens fornecidas/indicadas por mim; não invente caminhos nem reutilize fotos sem autorização. Preserve alt. Depois da mudança, teste categorias com 1, 2 e 3 fotos de prévia e informe como validar.
```

### Prompt: serviço/categoria

```text
Quero [adicionar/remover/alterar] [serviço/categoria]. Inspecione src/routes/index.tsx e src/data/gallery.ts, verifique a ligação entre serviço e id da categoria e apresente um plano. Faça somente a mudança pedida, sem criar conteúdo ou fotos fictícias. Confirme que cartões e links funcionam.
```

### Prompt: contato

```text
Quero atualizar [WhatsApp/Instagram] para [novo valor]. Localize todas as referências, explique o que mudará e confirme o formato do link. Não altere outros conteúdos. Após editar, liste os arquivos e os testes dos botões no cabeçalho, rodapé e celular.
```

### Prompt: visual/responsividade

```text
Quero este ajuste visual: [descreva]. Inspecione os componentes e classes e explique impactos em celular, tablet e desktop antes de implementar. Preserve identidade, imagens e comportamentos. Não faça redesign nem adicione efeitos por iniciativa própria. Implemente só o pedido e diga como testar.
```

### Prompt: revisão pré-publicação

```text
Revise build, links/imagens quebrados, responsividade, acessibilidade básica, SEO, contatos, navegação, galeria e configuração de hospedagem. Não altere nada automaticamente. Liste problemas por prioridade, arquivo e correção sugerida. Não afirme que executou testes ou publicou se não fez isso.
```

## 8. Publicar na Cloudflare

**A configuração precisa ser confirmada antes do deploy.** O projeto usa TanStack Start e Vite com integração Nitro; não presuma que a saída seja uma pasta estática simples. Execute `npm run build`, leia os logs e confira `vite.config.ts` e arquivos de deploy existentes. Identifique se o projeto usa saída estática ou runtime/SSR.

Documentação oficial: [Cloudflare Developers](https://developers.cloudflare.com/) e [TanStack Start](https://tanstack.com/start/latest).

### Integração com GitHub
Depois de confirmar preset e comandos corretos:
1. No painel Cloudflare, abra Workers & Pages (nomes de telas podem mudar).
2. Crie um projeto e conecte GitHub, autorizando `stoianmurilo24-ops/pranviatmann`.
3. Escolha a branch (normalmente `main`).
4. Configure preset, build command e output conforme TanStack Start/Nitro validado. Não copie os valores de um tutorial de Vite estático sem conferir.
5. Acompanhe o primeiro build e abra a URL criada.
6. Commits na branch conectada podem disparar deploy automático.

Se a build falhar, leia o erro e confira a documentação do adaptador/runtime; não adivinhe diretório de saída.

### Publicação manual
1. Execute `npm run build`.
2. Identifique o artefato correto para o modo de deploy.
3. Use o método manual documentado pela Cloudflare para esse tipo de aplicação.
4. Não envie a pasta-fonte inteira ou uma pasta escolhida ao acaso.
5. Teste a URL e consulte os logs.

Em aplicações com runtime/SSR, upload de arquivos estáticos do Pages pode não bastar. Confirme se o fluxo correto é Worker ou outro método compatível com o adaptador.

### Após publicar, teste
- Página inicial, imagens e navegação;
- botões WhatsApp e Instagram;
- menu mobile;
- todas as categorias e fotos;
- FAQ;
- janela anônima;
- HTTPS.

## 9. Domínio próprio

O domínio ainda não foi comprado. Quando existir:
1. Registre em um registrador confiável.
2. Adicione-o à Cloudflare, se necessário para o modelo escolhido.
3. Configure nameservers/DNS conforme instruções oficiais.
4. Adicione o domínio personalizado no serviço de hospedagem.
5. Aguarde validação e HTTPS.
6. Teste com e sem `www`, conforme configurado.
7. Atualize metadados com URLs absolutas que ainda apontem ao domínio antigo.

DNS pode levar tempo para propagar. Não remova registros sem entender seu uso; e-mail do domínio pode depender deles.

## 10. Backup, testes e problemas comuns

### Backup
Mantenha repositório GitHub, cópia local, originais das fotografias fora da pasta de build e registro dos dados/textos aprovados. Git não substitui backup dos originais.

### Checklist
- [ ] Mudança corresponde ao pedido aprovado.
- [ ] Nenhum conteúdo, avaliação, imagem, contato ou promessa foi inventado.
- [ ] Links e caminhos de imagem conferidos.
- [ ] Celular e desktop testados.
- [ ] Build sem erro.
- [ ] Diff/commit revisado.
- [ ] Deploy terminou.
- [ ] Site publicado foi testado.

### Diagnóstico rápido

| Problema | Conferir |
| --- | --- |
| `node`/`npm` não funciona | Instalação e terminal novo |
| Dependências falham | Versão Node, conexão, lockfile e mensagem de erro |
| Local não abre | Endereço informado pelo `npm run dev`; servidor ativo |
| Foto quebrada | Nome, extensão, maiúsculas/minúsculas, `public/images` |
| Categoria ausente | Lista de fotos e id |
| Serviço abre categoria errada | Id em `services` e `gallery.ts` |
| Build falha | Primeiro erro real, sintaxe e dependências |
| Cloudflare build falha | Runtime/preset, comando e artefato TanStack Start/Nitro |
| Mudança não aparece | Commit/push, deploy, cache ou URL |
| WhatsApp incorreto | Constante `WA` e formato internacional |

## 11. Referência técnica

Scripts existentes em `package.json`:

| Comando | Função |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run build:dev` | Build development |
| `npm run preview` | Prévia da build |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run test:watch` | Vitest em watch |
| `npm run format` | Prettier |

Links: [GitHub do projeto](https://github.com/stoianmurilo24-ops/pranviatmann) · [React](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/docs/) · [TanStack Start](https://tanstack.com/start/latest) · [Vite](https://vite.dev/) · [Tailwind](https://tailwindcss.com/docs) · [Cloudflare](https://developers.cloudflare.com/)

---

**Manual vivo:** atualize este README quando estrutura, comandos, contatos, hospedagem ou processo de publicação mudarem. Se algo não corresponder ao projeto, confira o código e a documentação oficial antes de seguir.
