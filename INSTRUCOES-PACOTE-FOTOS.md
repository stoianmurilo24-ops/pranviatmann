# Conclusão da atualização de fotos

A estrutura do site foi preparada para separar Serviços de Galeria/Portfólio.

## Falta adicionar o pacote binário

Coloque o arquivo **`site-fotos.zip` na raiz deste repositório**, no mesmo nível de `package.json`.

O ZIP deve conter exatamente estas duas pastas na raiz interna:
- `servicos/`
- `galeria/`

O arquivo entregue com esse nome já contém 44 fotografias WebP, organizadas por trabalho. Não coloque o ZIP dentro de `public/`.

## Extração automática

O script `scripts/extract-photo-bundle.mjs` é executado pelo `prebuild` antes de `npm run build`. Ele extrai o pacote para:
- `public/images/servicos/`
- `public/images/galeria/`

O script valida os caminhos e os tamanhos extraídos. Se o ZIP não estiver na raiz, a build apenas avisa e as fotos não aparecerão.

## Distribuição das fotos

| Área | Coleção | Fotos |
| --- | --- | ---: |
| Serviços | Casamentos — Cida & Wagner | 8 |
| Serviços | Festas de 15 anos — Maria Eduarda | 9 |
| Serviços | Ensaios — Andreia & Maicon | 10 |
| Portfólio | Casamento — Daiana & Rodrigo | 9 |
| Portfólio | Debutante Vitória | 8 |
| **Total** | | **44** |

As quatro artes promocionais que estavam misturadas nos ZIPs originais foram excluídas. As imagens selecionadas foram comparadas por hash e não há duplicatas entre Serviços e Portfólio.

## Comportamento já preparado no código

- Um único arquivo de capa por cartão.
- Clique em Serviços abre imediatamente o conjunto daquele tipo de serviço.
- Clique em Galeria abre imediatamente somente o álbum daquele trabalho.
- Setas, teclado e gesto de deslizar navegam dentro da coleção aberta.
- O menu inclui Galeria entre Sobre e Avaliações.
- O texto de legenda é opcional; há um exemplo preenchido no primeiro registro do ensaio Andreia & Maicon.

**Não mescle esta branch antes de adicionar `site-fotos.zip` à raiz**, para que a primeira versão publicada já tenha as fotografias.
