import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { GalleryPhoto } from "@/data/gallery";

type LightboxProps = {
  /** Fotos exclusivas da coleção selecionada. */
  photos: GalleryPhoto[];
  /** Índice da foto aberta; `null` = fechado. */
  index: number | null;
  /** Nome do serviço ou trabalho exibido. */
  title: string;
  /** Texto opcional para aparecer abaixo da foto quando ela não tiver legenda própria. */
  description?: string;
  onClose: () => void;
  onChange: (index: number) => void;
};

const roundBtn =
  "grid h-10 w-10 place-items-center rounded-full border bg-card/80 text-foreground backdrop-blur transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary";

/**
 * Visualização ampliada de uma foto da galeria.
 * Fecha com o botão X, tecla Esc ou clique fora da foto.
 * Troca de foto com as setas, as teclas ← → ou deslizando o dedo.
 */
export function Lightbox({ photos, index, title, description, onClose, onChange }: LightboxProps) {
  const current = index === null ? undefined : photos[index];
  const isOpen = current !== undefined;
  const total = photos.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Ao abrir: trava a rolagem da página e leva o foco para o botão Fechar.
  // Ao fechar: devolve a rolagem e o foco para quem abriu.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [isOpen]);

  // Teclado: Esc fecha, setas trocam de foto, Tab fica preso dentro da janela.
  useEffect(() => {
    if (!isOpen || index === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && total > 1) {
        onChange((index - 1 + total) % total);
      } else if (e.key === "ArrowRight" && total > 1) {
        onChange((index + 1) % total);
      } else if (e.key === "Tab") {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        const first = items?.[0];
        const last = items?.[items.length - 1];
        if (!first || !last) return;
        const active = document.activeElement;
        if (!dialogRef.current?.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, index, total, onClose, onChange]);

  if (!current || index === null) return null;

  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Foto ampliada"}
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/90 duration-200"
      onClick={(e) => {
        // Clique no fundo (fora da foto e dos botões) fecha.
        if (!(e.target as HTMLElement).closest("img, button")) onClose();
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        const end = e.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start === null || end === undefined || total < 2) return;
        if (end - start > 50) prev();
        else if (start - end > 50) next();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className={`absolute right-4 top-4 ${roundBtn}`}
      >
        <X className="h-4 w-4" />
      </button>

      {total > 1 && (
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={prev}
          className={`absolute left-3 top-1/2 -translate-y-1/2 md:left-6 ${roundBtn}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      <figure className="flex max-h-full max-w-full flex-col items-center px-4 py-16 md:px-24">
        <img
          src={current.src}
          alt={current.alt}
          className="max-h-[80dvh] max-w-full rounded-sm object-contain shadow-2xl"
        />
        <figcaption className="mt-3 text-center text-[0.65rem] text-muted-foreground">
          {title} · {index + 1} / {total}
        </figcaption>
        {(current.caption || description) && (
          <p className="mt-2 max-w-2xl text-center text-sm text-white/85">
            {current.caption ?? description}
          </p>
        )}
      </figure>

      {total > 1 && (
        <button
          type="button"
          aria-label="Próxima foto"
          onClick={next}
          className={`absolute right-3 top-1/2 -translate-y-1/2 md:right-6 ${roundBtn}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
