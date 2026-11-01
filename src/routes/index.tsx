import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Camera, Star, Heart, ShieldCheck, ArrowRight, ChevronUp,
  Plus, Menu, X, Instagram, MessageCircle,
} from "lucide-react";
import tavares from "@/assets/tavares.png";
import { Logo } from "@/components/Logo";
import { Lightbox } from "@/components/Lightbox";
import { portfolioAlbums, serviceCollections, type PhotoCollection } from "@/data/gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tavares Pranviatmann | Fotografia em Santos - SP" },
      { name: "description", content: "Registros que contam histórias: casamentos, festas de 15 anos e ensaios fotográficos em Santos - SP." },
      { property: "og:title", content: "Tavares Pranviatmann | Santos - SP" },
      { property: "og:description", content: "Transformo momentos únicos em lembranças para toda a vida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WA = "https://wa.me/5513991158252";
const IG = "https://www.instagram.com/pranviatmann";

// Links externos abrem em nova aba. "noopener noreferrer" impede que a página
// aberta controle ou identifique este site (segurança).
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

function WhatsBtn({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <a href={WA} {...EXTERNAL}
      className={`inline-flex items-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition hover:brightness-110 ${size === "sm" ? "px-4 py-1.5 text-[0.7rem]" : "py-2 pl-4 pr-2 text-xs"}`}>
      <MessageCircle className="h-3.5 w-3.5" /> Falar no WhatsApp
      {size === "md" && <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground text-background"><ArrowRight className="h-3 w-3" /></span>}
    </a>
  );
}

const nav = [["Início", "#inicio"], ["Serviços", "#servicos"], ["Sobre", "#sobre"], ["Galeria", "#galeria"], ["Avaliações", "#avaliacoes"], ["FAQ", "#faq"]];

const features = [
  [Camera, "Experiência", "em diversos eventos"],
  [Star, "Qualidade", "em cada clique"],
  [Heart, "Atendimento", "personalizado"],
  [ShieldCheck, "Compromisso", "com seu momento"],
] as const;

const reviews = [
  ["Trabalho incrível! O Tavares conseguiu registrar cada detalhe do nosso casamento de forma perfeita. Super recomendo!", "Juliana e Marcos", "Casamento"],
  ["As fotos da minha festa de 15 anos ficaram lindas! Ele tem um olhar único e muito profissional.", "Larissa Santos", "15 anos"],
  ["O ensaio foi uma experiência incrível! Ele soube captar exatamente o que eu queria.", "Carla Mendes", "Ensaio Fotografico"],
];

const faqs = [
  ["Como funciona o agendamento?", "Basta chamar no WhatsApp, informar a data e o tipo de evento. Confirmamos a disponibilidade e enviamos o orçamento."],
  ["Qual é o prazo de entrega das fotos?", "O prazo varia conforme o evento, geralmente entre 15 e 30 dias após a data."],
  ["Vocês trabalham com filmagem também?", "Sim, podemos incluir filmagem no pacote. Consulte as opções."],
  ["É possível fazer um pacote personalizado?", "Claro! Montamos o pacote ideal de acordo com a sua necessidade."],
];

export function Index() {
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<PhotoCollection | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Menu fixo ganha fundo ao rolar; botão "voltar ao topo" aparece depois de rolar um pouco.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc fecha o menu do celular.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function openCollection(collection: PhotoCollection) {
    setSelectedCollection(collection);
    const coverIndex = collection.photos.findIndex((photo) => photo.src === collection.cover);
    setLightboxIndex(coverIndex >= 0 ? coverIndex : 0);
  }

  return (
    <div className="mx-auto max-w-6xl overflow-hidden">
      {/* HEADER */}
      <header className={`fixed inset-x-0 top-0 z-30 mx-auto flex max-w-6xl items-center justify-between border-b px-6 py-5 transition-colors duration-300 md:px-12 ${scrolled || open ? "bg-background/90 backdrop-blur" : "border-transparent"}`}>
        <Logo />
        <nav className="hidden gap-8 text-xs md:flex">
          {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}
        </nav>
        <div className="hidden md:block"><WhatsBtn size="sm" /></div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} aria-controls="menu-mobile">
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <div id="menu-mobile" className="absolute inset-x-4 top-20 flex flex-col gap-4 rounded-xl border bg-card p-6 text-sm md:hidden">
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
            <WhatsBtn size="sm" />
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-[560px] lg:min-h-[600px]">
        <img src={tavares} alt="Tavares Pranviatmann" className="absolute right-[8%] top-32 z-10 h-[340px] w-auto object-contain sm:top-24 sm:right-[9%] md:top-16 md:right-[10%] md:h-[520px] lg:top-auto lg:right-auto lg:bottom-0 lg:left-[55%] lg:h-[88%]" />
        <div className="hero-fade absolute inset-0 z-10" />
        <div className="relative z-20 max-w-[64%] px-6 pt-28 md:max-w-[55%] md:px-12 md:pt-32 lg:max-w-none lg:pt-36">
          <p className="eyebrow">Registros que contam histórias</p>
          <h1 className="mt-3 font-semibold leading-[1.05]">
            <span className="block text-lg font-medium sm:text-2xl md:text-3xl">Tavares</span>
            <span className="block text-[1.6rem] sm:text-5xl lg:text-6xl">Pranviatmann</span>
            <span className="block text-xl text-primary sm:text-4xl">Santos - SP</span>
          </h1>
          <p className="mt-4 max-w-xs text-sm text-foreground/85">
            Transformo momentos únicos em lembranças para toda a vida, com sensibilidade, técnica e um olhar real sobre cada detalhe.
          </p>
        </div>
        <div className="relative z-20 grid grid-cols-1 gap-4 px-6 py-10 md:grid-cols-4 md:px-12">
          {features.map(([Icon, t, s]) => (
            <div key={t} className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <div><p className="text-xs font-medium">{t}</p><p className="text-[0.65rem] text-muted-foreground">{s}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIÇOS — uma capa por categoria; clique abre somente as fotos daquele serviço. */}
      <section id="servicos" className="border-t px-6 py-14 md:px-12">
        <div>
          <p className="eyebrow">Serviços</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Nossos Serviços</h2>
          <p className="mt-2 max-w-xl text-xs text-muted-foreground">
            Cada categoria abre diretamente uma seleção de fotografias daquele tipo de trabalho.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {serviceCollections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              onClick={() => openCollection(collection)}
              aria-label={`Ver fotos de ${collection.label}`}
              className="group relative overflow-hidden rounded-lg border bg-card text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={collection.cover}
                  alt={collection.photos[0]?.alt ?? collection.label}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                  <div>
                    <h3 className="text-base font-semibold">{collection.label}</h3>
                    <p className="mt-1 text-xs text-white/85">{collection.description}</p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/60 transition group-hover:bg-white group-hover:text-black">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="relative grid border-t md:grid-cols-2">
        <div className="order-2 flex items-end justify-center bg-background md:order-1">
          <img src={tavares} alt="Tavares Pranviatmann" className="h-72 object-contain md:h-96" />
        </div>
        <div className="order-1 px-6 py-12 md:order-2 md:px-12 md:py-16">
          <p className="eyebrow">Sobre</p>
          <h2 className="mt-2 text-2xl font-semibold">Tavares Pranviatmann</h2>
          <p className="mt-4 text-sm text-foreground/85">Sou o Tavares, fótografo em Santos - SP, e meu propósito é registrar o que realmente importa: pessoas, sentimentos e momentos que não se repetem.</p>
          <p className="mt-4 text-sm text-foreground/85">Com um olhar atento aos detalhes e muita dedicação, transformo cada clique em uma lembrança que dura para sempre.</p>
        </div>
      </section>

      {/* GALERIA / PORTFÓLIO — uma capa por trabalho e álbuns independentes. */}
      <section id="galeria" className="border-t px-6 py-14 md:px-12">
        <div>
          <p className="eyebrow">Portfólio</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Galeria</h2>
          <p className="mt-2 max-w-xl text-xs text-muted-foreground">
            Cada miniatura representa um trabalho. Clique para abrir somente as fotos daquele álbum.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {portfolioAlbums.map((album) => (
            <button
              key={album.id}
              type="button"
              onClick={() => openCollection(album)}
              aria-label={`Abrir álbum: ${album.label}`}
              className="group relative overflow-hidden rounded-lg border bg-card text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={album.cover}
                  alt={album.photos[0]?.alt ?? album.label}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                  <div>
                    <h3 className="text-base font-semibold">{album.label}</h3>
                    <p className="mt-1 text-xs text-white/85">{album.photos.length} fotos</p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/60 transition group-hover:bg-white group-hover:text-black">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Lightbox
        photos={selectedCollection?.photos ?? []}
        index={lightboxIndex}
        title={selectedCollection?.label ?? ""}
        description={selectedCollection?.description}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />

      {/* AVALIAÇÕES */}
      <section id="avaliacoes" className="px-6 py-10 md:px-12">
        <p className="eyebrow">Clientes</p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Avaliações</h2>
        <p className="mt-2 text-xs text-muted-foreground">O que dizem sobre o meu trabalho.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map(([q, n, t]) => (
            <div key={n} className="rounded-lg border bg-card p-5">
              <p className="font-logo text-2xl leading-none text-primary">“</p>
              <p className="text-xs text-foreground/85">{q}</p>
              <div className="mt-4 flex items-end justify-between">
                <div><p className="text-xs font-medium">{n}</p><p className="text-[0.6rem] text-muted-foreground">{t}</p></div>
                <div className="flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-current" />)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="grid gap-8 px-6 py-12 md:grid-cols-[1fr_1.4fr] md:px-12">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Dúvidas Frequentes</h2>
          <p className="mt-2 text-xs text-muted-foreground">Aqui estão as principais dúvidas sobre o meu trabalho.</p>
        </div>
        <div className="space-y-2">
          {faqs.map(([q, a], i) => (
            <div key={q} className="rounded-md border bg-card">
              <button type="button" id={`faq-q-${i}`} aria-expanded={faq === i} aria-controls={`faq-a-${i}`} onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[0.7rem]">
                {q}<Plus className={`h-3 w-3 transition ${faq === i ? "rotate-45" : ""}`} />
              </button>
              {faq === i && <p id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="px-4 pb-3 text-[0.7rem] text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 py-10 md:px-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Logo small />
          <nav aria-label="Navegação do rodapé" className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-[0.65rem]">
            {nav.map(([l, h]) => <a key={h} href={h} className="transition hover:text-primary">{l}</a>)}
          </nav>
          <div className="flex items-center gap-5">
            <a href={IG} {...EXTERNAL} aria-label="Instagram" className="flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4" /><span className="text-[0.65rem]">@pranviatmann</span></a>
            <a href={WA} {...EXTERNAL} aria-label="WhatsApp" className="hover:text-primary"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="mt-8 flex justify-between text-[0.6rem] text-muted-foreground">
          <span>© 2026 Tavares Pranviatmann. Todos os direitos reservados.</span><span>Santos - SP</span>
        </div>
      </footer>

      {/* VOLTAR AO TOPO */}
      <button type="button" aria-label="Voltar ao topo" aria-hidden={!showTop} tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-40 grid h-10 w-10 place-items-center rounded-full border bg-card/90 text-foreground shadow-lg backdrop-blur transition hover:border-primary hover:text-primary ${showTop ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
}
