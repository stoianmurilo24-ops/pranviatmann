import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/Logo";

/** Página 404 — aparece quando o endereço digitado não existe. */
export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <Logo href="/" />
      <p className="eyebrow mt-12">Erro 404</p>
      <h1 className="mt-3 text-2xl font-semibold md:text-4xl">Página não encontrada</h1>
      <p className="mt-3 max-w-xs text-sm text-foreground/85">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-4 pr-2 text-xs font-semibold text-primary-foreground transition hover:brightness-110"
      >
        Voltar ao início
        <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground text-background">
          <ArrowRight className="h-3 w-3" />
        </span>
      </Link>
    </main>
  );
}
