/**
 * Coleções independentes: Serviços e Portfólio.
 * Cada cartão exibe somente a primeira foto (capa) e abre diretamente o Lightbox.
 * As fotos de cada coleção são exclusivas e não são repetidas entre as áreas.
 */
export type GalleryPhoto = {
  src: string;
  alt: string;
  /** Legenda opcional por foto. Exemplo preenchido no primeiro registro do ensaio. */
  caption?: string;
};

export type PhotoCollection = {
  id: string;
  label: string;
  description?: string;
  cover: string;
  photos: GalleryPhoto[];
};

const makePhotos = (
  base: string,
  prefix: string,
  count: number,
  label: string,
  firstCaption?: string,
): GalleryPhoto[] =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `${base}/${prefix}-${number}.webp`,
      alt: `${label} — foto ${index + 1}`,
      ...(index === 0 && firstCaption ? { caption: firstCaption } : {}),
    };
  });

export const serviceCollections: PhotoCollection[] = [
  {
    id: "casamentos",
    label: "Casamentos",
    description: "Fotografia de casamentos e cerimônias.",
    cover: "/images/servicos/casamentos/casamento-cida-wagner-01.webp",
    photos: makePhotos("/images/servicos/casamentos", "casamento-cida-wagner", 8, "Casamento de Cida e Wagner"),
  },
  {
    id: "festas-15-anos",
    label: "Festas de 15 anos",
    description: "Fotografia de festas e celebrações de 15 anos.",
    cover: "/images/servicos/festas-15-anos/festa-15-anos-maria-eduarda-01.webp",
    photos: makePhotos("/images/servicos/festas-15-anos", "festa-15-anos-maria-eduarda", 9, "Festa de 15 anos de Maria Eduarda"),
  },
  {
    id: "ensaios",
    label: "Ensaios fotográficos",
    description: "Ensaio fotográfico de Andreia e Maicon.",
    cover: "/images/servicos/ensaios/ensaio-andreia-maicon-01.webp",
    photos: makePhotos(
      "/images/servicos/ensaios",
      "ensaio-andreia-maicon",
      10,
      "Ensaio de Andreia e Maicon",
      "Ensaio fotográfico de Andreia e Maicon.",
    ),
  },
];

export const portfolioAlbums: PhotoCollection[] = [
  {
    id: "casamento-daiana-rodrigo",
    label: "Casamento — Daiana & Rodrigo",
    cover: "/images/galeria/casamento-daiana-rodrigo/casamento-daiana-rodrigo-01.webp",
    photos: makePhotos("/images/galeria/casamento-daiana-rodrigo", "casamento-daiana-rodrigo", 9, "Casamento de Daiana e Rodrigo"),
  },
  {
    id: "debutante-vitoria",
    label: "Debutante Vitória",
    cover: "/images/galeria/debutante-vitoria/debutante-vitoria-01.webp",
    photos: makePhotos("/images/galeria/debutante-vitoria", "debutante-vitoria", 8, "Debutante Vitória"),
  },
];
