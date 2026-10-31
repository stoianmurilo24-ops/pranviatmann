/**
 * Galeria organizada por categoria.
 * Uma categoria só aparece quando possui fotos reais cadastradas.
 */
export type PhotoEntry = {
  src: string;
  alt?: string;
};

export type GalleryCategory = {
  id: string;
  label: string;
  photos: PhotoEntry[];
  /** Capa exclusiva do card, independente da primeira foto do álbum. */
  cover?: string;
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
    cover: "/images/portfolio/capa-casamentos.webp",
    photos: [
      { src: "/images/portfolio/capa-casamentos.webp", alt: "Noivos em um beijo durante o casamento" },
      { src: "/images/p2.png", alt: "Casal durante a cerimônia de casamento" },
      { src: "/images/p4.png", alt: "Detalhe da decoração e do bolo de casamento" },
      { src: "/images/p6.png", alt: "Registro dos noivos com as alianças" },
    ],
  },
  {
    id: "15-anos",
    label: "Festa de 15 anos",
    cover: "/images/portfolio/capa-15-anos.webp",
    photos: [
      { src: "/images/portfolio/capa-15-anos.webp", alt: "Aniversariante em seu salão de festa iluminado" },
      { src: "/images/p1.png", alt: "Aniversariante durante a festa de 15 anos" },
    ],
  },
  {
    id: "ensaios",
    label: "Ensaio Fotográfico",
    cover: "/images/p5.png",
    photos: [
      { src: "/images/p3.png", alt: "Registro de ensaio fotográfico" },
      { src: "/images/p5.png", alt: "Registro de ensaio fotográfico" },
      { src: "/images/p7.png", alt: "Registro de ensaio fotográfico" },
    ],
  },
  { id: "formaturas", label: "Formaturas", photos: [] },
  { id: "gestantes", label: "Gestantes", photos: [] },
];

/** Categorias que possuem ao menos uma foto. */
export function activeCategories(list: GalleryCategory[] = categories): GalleryCategory[] {
  return list.filter((category) => category.photos.length > 0);
}

/** Fotos correspondentes à categoria selecionada. */
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
