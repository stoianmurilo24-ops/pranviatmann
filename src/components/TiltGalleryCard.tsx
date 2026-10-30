import { useState, type PointerEvent } from "react";

type TiltGalleryCardProps = {
  src: string;
  alt: string;
  onClick: () => void;
};

/** Gentle pointer tilt for gallery thumbnails; touch interaction stays simple. */
export function TiltGalleryCard({ src, alt, onClick }: TiltGalleryCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 7 });
  }

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      aria-label={`Ampliar foto: ${alt}`}
      className="aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-sm bg-muted shadow-sm md:aspect-[4/3]"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 180ms ease-out, box-shadow 180ms ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </button>
  );
}
