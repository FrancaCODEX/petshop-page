import { ArrowUpRight } from "lucide-react";
import { services } from "../data";
import { Photo } from "./UI";

export function Services({ onBook }: { onBook: (service?: string) => void }) {
  return (
    <section
      className="section services-section"
      id="servicos"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 id="services-title">
              Tudo para uma vida
              <br className="mobile-only" /> mais feliz.
            </h2>
            <p>Da rotina de cuidados aos momentos de diversão.</p>
          </div>
          <span className="heading-side">Nossos serviços</span>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            const content = (
              <>
                <div className="service-copy">
                  <h3>{service.name}</h3>
                  <p>{service.text}</p>
                  <span className="service-cta">
                    {service.name === "Adoção"
                      ? "Conhecer a Luna"
                      : "Conhecer e agendar"}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>
                <Photo name={service.image} alt="" width={280} height={230} />
              </>
            );
            return service.name === "Adoção" ? (
              <a
                key={service.name}
                href="#adocao"
                className={`service-card tone-${service.tone}`}
              >
                {content}
              </a>
            ) : (
              <button
                key={service.name}
                className={`service-card tone-${service.tone}`}
                onClick={() => onBook(service.name)}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
