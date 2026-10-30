/**
 * GALERIA DO SITE — fotos organizadas por categoria.
 *
 * Este é o único arquivo que precisa ser editado para:
 *   - adicionar uma foto nova a uma categoria que já existe;
 *   - trocar uma foto por outra;
 *   - ativar uma categoria nova (Formaturas, Gestantes ou qualquer outra).
 *
 * Regras:
 *   - As imagens ficam na pasta `public/images/`. O caminho começa com `/images/`.
 *   - Uma categoria só aparece no site (filtro da galeria) quando tem pelo menos
 *     uma foto na lista `photos`. Categoria com `photos: []` fica escondida.
 *   - A aba "Todos" mostra automaticamente as fotos de todas as categorias.
 *   - Mais detalhes no README.md (seção "Galeria de fotos").
 */

export type PhotoEntry = {
  /** Caminho da imagem a partir da pasta public/. Ex.: "/images/casamento-01.jpg" */
  src: string;
  /** Texto alternativo (opcional). Se não for informado, usa "Trabalho fotográfico — <categoria>". */
  alt?: string;
};

export type GalleryCategory = {
  /** Identificador interno, sem espaços nem acentos. Ex.: "casamentos" */
  id: string;
  /** Nome que aparece no botão de filtro. */
  label: string;
  photos: PhotoEntry[];
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  categoryId: string;
  categoryLabel: string;
};

/** Identificador da aba que mostra todas as categorias juntas. */
export const ALL_CATEGORIES = "todos";

export const categories: GalleryCategory[] = [
  {
    id: "casamentos",
    label: "Casamentos",
    photos: [
      { src: "/images/p2.png", alt: "Casal durante a cerimônia de casamento" },
      { src: "/images/p4.png", alt: "Detalhe da decoração e do bolo de casamento" },
      { src: "/images/p6.png", alt: "Registro dos noivos com as alianças" },
    ],
  },
  {
    id: "15-anos",
    label: "Festa de 15 anos",
    photos: [{ src: "/images/p1.png" }],
  },
  {
    id: "ensaios",
    label: "Ensaio Fotografico",
    photos: [{ src: "/images/p3.png" }, { src: "/images/p5.png" }, { src: "/images/p7.png" }],
  },
  // Categorias previstas, aguardando fotos reais. Só aparecem no site quando
  // receberem pelo menos uma foto na lista `photos`.
  { id: "formaturas", label: "Formaturas", photos: [] },
  { id: "gestantes", label: "Gestantes", photos: [] },
];

/** Categorias que já têm fotos (as únicas exibidas no site). */
export function activeCategories(list: GalleryCategory[] = categories): GalleryCategory[] {
  return list.filter((c) => c.photos.length > 0);
}

/** Fotos a exibir para um filtro. Filtro desconhecido equivale a "todos". */
export function photosFor(
  categoryId: string,
  list: GalleryCategory[] = categories,
): GalleryPhoto[] {
  const active = activeCategories(list);
  const selected =
    categoryId === ALL_CATEGORIES ? active : active.filter((c) => c.id === categoryId);
  const chosen = selected.length > 0 ? selected : active;
  return chosen.flatMap((c) =>
    c.photos.map((p) => ({
      src: p.src,
      alt: p.alt ?? `Trabalho fotográfico — ${c.label}`,
      categoryId: c.id,
      categoryLabel: c.label,
    })),
  );
}

/** Garante que um filtro exista; se a categoria não tiver fotos, volta para "todos". */
export function resolveCategory(categoryId: string, list: GalleryCategory[] = categories): string {
  return activeCategories(list).some((c) => c.id === categoryId) ? categoryId : ALL_CATEGORIES;
}
