/**
 * Coleções independentes: Serviços e Portfólio.
 * Um cartão = uma foto de capa. Clique abre diretamente o visualizador.
 * Nenhuma imagem é compartilhada entre Serviços e Galeria.
 */
export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

export type PhotoCollection = {
  id: string;
  label: string;
  description?: string;
  cover: string;
  photos: GalleryPhoto[];
};

export const serviceCollections: PhotoCollection[] = [
  {
    id: "casamentos",
    label: "Casamentos",
    description: "Fotografia de casamentos e cerimônias.",
    cover: "/images/p2.png",
    photos: [
      { src: "/images/p6.png", alt: "Registro de casamento — foto 1" },
      { src: "/images/p4.png", alt: "Registro de casamento — foto 2" },
      { src: "/images/p2.png", alt: "Registro de casamento — foto 3" },
    ],
  },
  {
    id: "festas-15-anos",
    label: "Festas de 15 anos",
    description: "Fotografia de festas e celebrações de 15 anos.",
    cover: "/images/15-anos-noite.webp",
    photos: [
      { src: "/images/15-anos-noite.webp", alt: "Festa de 15 anos — foto 1" },
      { src: "/images/p1.png", alt: "Festa de 15 anos — foto 2" },
    ],
  },
  {
    id: "ensaios",
    label: "Ensaios fotográficos",
    description: "Ensaios fotográficos.",
    cover: "/images/p7.png",
    photos: [
      { src: "/images/p7.png", alt: "Ensaio fotográfico — foto 1", caption: "Exemplo de legenda: escreva aqui os detalhes deste ensaio." },
      { src: "/images/p5.png", alt: "Ensaio fotográfico — foto 2" },
      { src: "/images/p3.png", alt: "Ensaio fotográfico — foto 3" },
    ],
  },
];

export const portfolioAlbums: PhotoCollection[] = [
  {
    id: "portfolio-casamentos",
    label: "Portfólio — Casamentos",
    cover: "/images/portfolio/capa-casamentos.webp",
    photos: [
      { src: "/images/portfolio/capa-casamentos.webp", alt: "Portfólio de casamentos" },
    ],
  },
  {
    id: "portfolio-festas",
    label: "Portfólio — Festas de 15 anos",
    cover: "/images/portfolio/capa-15-anos.webp",
    photos: [
      { src: "/images/portfolio/capa-15-anos.webp", alt: "Portfólio de festas de 15 anos" },
    ],
  },
];
