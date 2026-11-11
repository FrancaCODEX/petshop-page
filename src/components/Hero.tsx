import {
  ArrowRight,
  CalendarDays,
  Heart,
  PawPrint,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Photo } from "./UI";

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 id="hero-title">
              Cuidado completo <br />
              para o seu <br />
              <span>melhor amigo!</span>
            </h1>
            <p>
              Serviços, saúde, bem-estar, produtos
              <br className="desktop-break" /> e muito amor em um só lugar.
            </p>
            <div className="hero-actions">
              <button className="button" onClick={onBook}>
                <CalendarDays size={20} aria-hidden="true" />
                Agendar serviço
              </button>
              <a className="button button-cream" href="#loja">
                <ShoppingBag size={20} aria-hidden="true" />
                Comprar na loja
              </a>
            </div>
            <div className="hero-signoff">
              <span className="small-paw">
                <PawPrint size={17} aria-hidden="true" />
              </span>
              Para todas as fases da vida.
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-blob mint-blob" />
            <div className="hero-blob yellow-blob" />
            <div className="hero-blob coral-blob" />
            <Heart
              className="hero-heart"
              size={58}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <Photo
              name="hero-pets"
              alt="Golden retriever de bandana coral ao lado de um gato tigrado"
              eager
              width={1200}
              height={981}
            />
            <div className="pet-note">
              <PawPrint size={23} aria-hidden="true" />
              <span>
                Cuidar é o nosso
                <br />
                <strong>jeito de amar.</strong>
              </span>
            </div>
          </div>
        </div>
        <a href="#servicos" className="hero-bottom-link">
          Conheça a PetAmigo
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </section>
      <Benefits />
    </>
  );
}
function Benefits() {
  const benefits = [
    {
      icon: Heart,
      title: "Carinho de verdade",
      text: "Cuidado em cada detalhe.",
    },
    {
      icon: ShieldCheck,
      title: "Saúde e bem-estar",
      text: "Atenção para cada fase.",
    },
    {
      icon: CalendarDays,
      title: "Mais praticidade",
      text: "Serviços em um só lugar.",
    },
    {
      icon: Sparkles,
      title: "Do jeito do seu pet",
      text: "Cada amigo é único.",
    },
  ];
  return (
    <section className="benefits" aria-label="Benefícios PetAmigo">
      <div className="container benefits-grid">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="benefit" key={title}>
            <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
