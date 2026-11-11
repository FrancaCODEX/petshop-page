import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  Gift,
  PawPrint,
  Scissors,
} from "lucide-react";
import { Photo } from "./UI";

export function Club({ onDetails }: { onDetails: () => void }) {
  return (
    <section className="club-section" id="clube" aria-labelledby="club-title">
      <div className="container">
        <div className="club-band">
          <div className="club-art">
            <div className="club-sun" />
            <Photo
              name="club-dog"
              alt="Cão com óculos escuros e coroa amarela"
              width={400}
              height={385}
            />
            <PawPrint className="club-paw" size={36} aria-hidden="true" />
          </div>
          <div className="club-copy">
            <h2 id="club-title">
              Clube
              <br />
              <span>PetAmigo</span>
            </h2>
            <p>
              Seu melhor amigo merece
              <br />
              um cuidado especial.
            </p>
            <button className="button button-yellow" onClick={onDetails}>
              Conhecer o clube
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <ul className="club-perks">
            {[
              { icon: BadgePercent, text: "Descontos na loja" },
              { icon: CalendarDays, text: "Prioridade no agendamento" },
              { icon: Scissors, text: "Banho e tosa com preço especial" },
              { icon: Gift, text: "Benefícios e brindes exclusivos" },
            ].map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
