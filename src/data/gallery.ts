/**
 * Galeria organizada por categoria.
 * Cada card usa até três fotos do próprio álbum como miniatura.
 * O álbum continua exibindo todas as fotos cadastradas para a categoria.
 */
export type PhotoEntry = {
  src: string;
  alt?: string;
};

export type GalleryCategory = {
  id: string;
  label: string;
  photos: PhotoEntry[];
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  categoryId: string;
  categoryLabel: string;
};

export const ALL_CATEGORIES = "todos";

export const categories: GalleryCategory[] = [
  {
    id: "casamentos",
    label: "Casamentos",
    photos: [
      { src: "/images/p2.png", alt: "Noivos juntos durante o casamento" },
      { src: "/images/p4.png", alt: "Detalhe floral da decoração do casamento" },
      { src: "/images/p6.png", alt: "Momento do pedido e das alianças" },
    ],
  },
  {
    id: "15-anos",
    label: "Festa de 15 anos",
    photos: [
      { src: "/images/p1.png", alt: "Aniversariante durante a festa de 15 anos" },
    ],
  },
  {
    id: "ensaios",
    label: "Ensaio Fotográfico",
    photos: [
      { src: "/images/p3.png", alt: "Casal em ensaio fotográfico ao ar livre" },
      { src: "/images/p5.png", alt: "Retrato em cenário urbano" },
      { src: "/images/p7.png", alt: "Retrato em ambiente natural" },
    ],
  },
  { id: "formaturas", label: "Formaturas", photos: [] },
  { id: "gestantes", label: "Gestantes", photos: [] },
];

/** Categorias que possuem ao menos uma foto. */
export function activeCategories(list: GalleryCategory[] = categories): GalleryCategory[] {
  return list.filter((category) => category.photos.length > 0);
}

/** Até três fotos para a miniatura; o álbum não usa este limite. */
export function previewPhotosFor(category: GalleryCategory): PhotoEntry[] {
  return category.photos.slice(0, 3);
}

/** Fotos correspondentes à categoria selecionada, sem limite de quantidade. */
export function photosFor(
  categoryId: string,
  list: GalleryCategory[] = categories,
): GalleryPhoto[] {
  const active = activeCategories(list);
  const selected = categoryId === ALL_CATEGORIES
    ? active
    : active.filter((category) => category.id === categoryId);
  const chosen = selected.length > 0 ? selected : active;
  return chosen.flatMap((category) =>
    category.photos.map((photo) => ({
      src: photo.src,
      alt: photo.alt ?? `Trabalho fotográfico — ${category.label}`,
      categoryId: category.id,
      categoryLabel: category.label,
    })),
  );
}

/** Evita selecionar categorias sem fotos ou inexistentes. */
export function resolveCategory(
  categoryId: string,
  list: GalleryCategory[] = categories,
): string {
  return activeCategories(list).some((category) => category.id === categoryId)
    ? categoryId
    : ALL_CATEGORIES;
}
