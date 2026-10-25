import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Camera, Star, Heart, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight,
  Plus, Menu, X, Instagram, MessageCircle,
} from "lucide-react";
import tavares from "@/assets/tavares.png";
import p1 from "@/assets/p1.png.asset.json";
import p2 from "@/assets/p2.png.asset.json";
import p3 from "@/assets/p3.webp.asset.json";
import p4 from "@/assets/p4.webp.asset.json";
import p5 from "@/assets/p5.webp.asset.json";
import p6 from "@/assets/p6.webp.asset.json";
import p7 from "@/assets/p7.webp.asset.json";

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
const photos = [p1, p2, p3, p4, p5, p6, p7].map((p) => p.url);

function Logo({ small }: { small?: boolean }) {
  return (
    <a href="#inicio" className="flex flex-col items-center leading-none">
      <Camera className={small ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={1.5} />
      <span className={`font-logo mt-1 tracking-[0.18em] ${small ? "text-lg" : "text-xl"}`}>TAVARES</span>
      <span className="mt-0.5 text-[0.45rem] tracking-[0.35em] text-muted-foreground">PRANVIATMANN</span>
    </a>
  );
}

function WhatsBtn({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <a href={WA} target="_blank" rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition hover:brightness-110 ${size === "sm" ? "px-4 py-1.5 text-[0.7rem]" : "py-2 pl-4 pr-2 text-xs"}`}>
      <MessageCircle className="h-3.5 w-3.5" /> Falar no WhatsApp
      {size === "md" && <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground text-background"><ArrowRight className="h-3 w-3" /></span>}
    </a>
  );
}

const nav = [["Início", "#inicio"], ["Serviços", "#servicos"], ["Sobre", "#sobre"], ["Avaliações", "#avaliacoes"], ["FAQ", "#faq"]];

const features = [
  [Camera, "Experiência", "em diversos eventos"],
  [Star, "Qualidade", "em cada clique"],
  [Heart, "Atendimento", "personalizado"],
  [ShieldCheck, "Compromisso", "com seu momento"],
] as const;

const services = [
  ["Casamentos", "Amor em cada detalhe.", photos[1]],
  ["Festa de 15 anos", "Sonhos que viram lembranças.", photos[0]],
  ["Ensaio Fotografico", "Sua história, do seu jeito.", photos[2]],
];

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
  const [g, setG] = useState(0);
  const gallery = [...photos.slice(g), ...photos.slice(0, g)].slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl overflow-hidden">
      {/* HEADER */}
      <header className="absolute inset-x-0 top-0 z-30 mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <Logo />
        <nav className="hidden gap-8 text-xs md:flex">
          {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}
        </nav>
        <div className="hidden md:block"><WhatsBtn size="sm" /></div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <div className="absolute inset-x-4 top-20 flex flex-col gap-4 rounded-xl border bg-card p-6 text-sm md:hidden">
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
            <WhatsBtn size="sm" />
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-[640px] md:min-h-[600px]">
        <div className="absolute inset-0">
          {[
            [photos[4], "left-[38%] top-[14%] w-40 -rotate-12"],
            [photos[5], "right-0 top-[8%] w-36 rotate-12"],
            [photos[6], "right-[12%] top-[30%] w-36 -rotate-6"],
            [photos[3], "right-[-2%] top-[46%] w-40 rotate-6"],
            [photos[2], "left-[30%] top-[62%] w-28 rotate-3 opacity-60"],
          ].map(([src, pos], i) => (
            <img key={i} src={src} alt="" className={`absolute hidden aspect-[4/5] rounded-sm object-cover opacity-70 shadow-2xl md:block ${pos}`} />
          ))}
        </div>
        <img src={tavares} alt="Tavares Pranviatmann" className="absolute top-14 left-1/2 z-10 h-[340px] w-auto -translate-x-1/2 object-contain md:top-auto md:bottom-0 md:left-[55%] md:h-[88%]" />
        <div className="hero-fade absolute inset-0 z-10" />
        <div className="relative z-20 px-6 pt-[400px] md:px-12 md:pt-36">
          <p className="eyebrow">Registros que contam histórias</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] md:text-5xl">
            Tavares<br />Pranviatmann<br /><span className="text-primary">Santos - SP</span>
          </h1>
          <p className="mt-4 max-w-xs text-sm text-foreground/85">
            Transformo momentos únicos em lembranças para toda a vida, com sensibilidade, técnica e um olhar real sobre cada detalhe.
          </p>
          <div className="mt-6"><WhatsBtn /></div>
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

      {/* SERVIÇOS */}
      <section id="servicos" className="border-t px-6 py-14 md:px-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Serviços</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Nossos Serviços</h2>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">Cada momento é único. Por isso, ofereço um olhar especial para cada tipo de registro.</p>
          </div>
          <a href={WA} className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-[0.6rem]">Ver todos os serviços <ArrowRight className="h-3 w-3" /></a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map(([t, s, img]) => (
            <a key={t} href={WA} className="group relative flex overflow-hidden rounded-lg border bg-card md:block">
              <img src={img} alt={t} className="h-16 w-20 object-cover md:h-56 md:w-full" />
              <div className="card-fade absolute inset-0 hidden md:block" />
              <div className="flex flex-1 items-center justify-between p-4 md:absolute md:inset-x-0 md:bottom-0">
                <div><p className="text-sm font-medium">{t}</p><p className="text-[0.65rem] text-muted-foreground">{s}</p></div>
                <span className="grid h-6 w-6 place-items-center rounded-full border"><ArrowRight className="h-3 w-3" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="relative grid border-t md:grid-cols-2">
        <div className="order-2 flex items-end justify-center bg-gradient-to-b from-secondary to-background md:order-1">
          <img src={tavares} alt="Tavares Pranviatmann" className="h-72 object-contain md:h-96" />
        </div>
        <div className="order-1 px-6 py-12 md:order-2 md:px-12 md:py-16">
          <p className="eyebrow">Sobre</p>
          <h2 className="mt-2 text-2xl font-semibold">Tavares Pranviatmann</h2>
          <p className="mt-4 text-sm text-foreground/85">Sou o Tavares, fótografo em Santos - SP, e meu propósito é registrar o que realmente importa: pessoas, sentimentos e momentos que não se repetem.</p>
          <p className="mt-4 text-sm text-foreground/85">Com um olhar atento aos detalhes e muita dedicação, transformo cada clique em uma lembrança que dura para sempre.</p>
          <div className="mt-6"><WhatsBtn /></div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="border-t px-6 py-14 md:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Trabalhos</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Galeria</h2>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">Alguns registros que mostram o meu olhar sobre cada história.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button aria-label="Anterior" onClick={() => setG((g - 1 + photos.length) % photos.length)} className="grid h-7 w-7 place-items-center rounded-full border"><ChevronLeft className="h-3.5 w-3.5" /></button>
            <button aria-label="Próximo" onClick={() => setG((g + 1) % photos.length)} className="grid h-7 w-7 place-items-center rounded-full border"><ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
        <div className="no-scrollbar -mx-6 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {photos.map((src) => (
            <img key={src} src={src} alt="Trabalho fotográfico" className={`aspect-[3/4] w-[58%] shrink-0 snap-center rounded-sm object-cover md:aspect-[4/3] md:w-full ${gallery.includes(src) ? "" : "md:hidden"}`} />
          ))}
        </div>
      </section>

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
          <div className="mt-6"><WhatsBtn /></div>
        </div>
        <div className="space-y-2">
          {faqs.map(([q, a], i) => (
            <div key={q} className="rounded-md border bg-card">
              <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[0.7rem]">
                {q}<Plus className={`h-3 w-3 transition ${faq === i ? "rotate-45" : ""}`} />
              </button>
              {faq === i && <p className="px-4 pb-3 text-[0.7rem] text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 py-10 md:px-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Logo small />
          <nav className="hidden gap-8 text-[0.65rem] md:flex">
            {nav.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <div className="flex items-center gap-5">
            <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4" /><span className="text-[0.65rem]">@pranviatmann</span></a>
            <a href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-primary"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="mt-8 flex justify-between text-[0.6rem] text-muted-foreground">
          <span>© 2026 Tavares Pranviatmann. Todos os direitos reservados.</span><span>Santos - SP</span>
        </div>
      </footer>
    </div>
  );
}
