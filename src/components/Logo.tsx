import { Camera } from "lucide-react";

/** Logo do site (usada no topo, no rodapé e na página 404). */
export function Logo({ small, href = "#inicio" }: { small?: boolean; href?: string }) {
  return (
    <a href={href} className="flex flex-col items-center leading-none">
      <Camera className={small ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={1.5} />
      <span className={`font-logo mt-1 tracking-[0.18em] ${small ? "text-2xl" : "text-xl"}`}>
        PRANVIATMANN 
      </span>
      <span className="mt-0.5 text-[0.60rem] tracking-[0.35em] text-muted-foreground">
        Foto & Film
      </span>
    </a>
  );
}
