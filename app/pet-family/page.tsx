import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import {
  petFamily as pf,
  petFamilyMapsUrl,
  petFamilyPhoneUrl,
  petFamilyWhatsappUrl,
} from "@/config/pet-family";
import "./pet-family.css";

export const metadata: Metadata = {
  title: pf.demo ? `${pf.name} — demonstração de site` : `${pf.name} — ${pf.tagline}`,
  description: `${pf.name}: clínica veterinária, banho e tosa e entrega na região do ${pf.regions.join(" e ")}, em ${pf.city}.`,
  robots: { index: false, follow: false },
};

const NAV = [
  ["Clínica 24h", "clinica"],
  ["Banho e Tosa", "banho-e-tosa"],
  ["Entrega", "entrega"],
  ["Contato", "contato"],
];

/** Marca visível de dado ainda não confirmado; some quando `demo` é false. */
function Pending({ children }: { children: React.ReactNode }) {
  return pf.demo ? <span className="pf-pending">{children}</span> : null;
}

function External({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="pf-sr"> (abre em nova aba)</span>
    </a>
  );
}

/**
 * Botão de WhatsApp. Sem número confirmado em config/pet-family.ts ele é
 * PROVISÓRIO: aparece desativado e não leva a lugar nenhum.
 */
function WhatsappButton({ url, block = false }: { url: string | null; block?: boolean }) {
  const className = `pf-button pf-button-ghost${block ? " pf-button-block" : ""}`;
  if (url)
    return (
      <External href={url} className={`pf-button${block ? " pf-button-block" : ""}`}>
        <Icon name="chat" /> Chamar no WhatsApp
      </External>
    );
  return (
    <button type="button" className={className} disabled>
      <Icon name="chat" /> WhatsApp: número a confirmar
    </button>
  );
}

export default function PetFamilyPage() {
  const whatsapp = petFamilyWhatsappUrl();
  const phone = petFamilyPhoneUrl();
  const maps = petFamilyMapsUrl();
  const { open24h } = pf.clinic;
  const regions = pf.regions.join(" e ");

  return (
    <div className="pf">
      <a className="pf-skip" href="#pf-conteudo">
        Pular para o conteúdo
      </a>

      {pf.demo && (
        <p className="pf-demo-bar" role="note">
          <strong>Demonstração independente.</strong> Não é o site oficial da {pf.name}. Dados do perfil{" "}
          {pf.instagram.handle}, ainda não confirmados pela equipe.
        </p>
      )}

      <header className="pf-header">
        <div className="pf-container pf-header-inner">
          <a className="pf-brand" href="#pf-inicio" aria-label={`${pf.name}, início`}>
            <span className="pf-brand-mark">
              <Icon name="paw" />
            </span>
            {pf.name}
          </a>
          <External href={whatsapp ?? pf.instagram.url} className="pf-button pf-button-small">
            <Icon name={whatsapp ? "chat" : "instagram"} /> {whatsapp ? "WhatsApp" : "Instagram"}
          </External>
        </div>
        <nav className="pf-nav" aria-label="Seções da página">
          <ul className="pf-container">
            {NAV.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="pf-conteudo">
        {/* HERO */}
        <section className="pf-hero pf-container" id="pf-inicio" aria-labelledby="pf-hero-title">
          <div>
            <p className="pf-eyebrow">
              {regions} · {pf.city}
            </p>
            <h1 id="pf-hero-title">
              Cuidado de família <em>para o seu pet.</em>
            </h1>
            <p className="pf-lead">
              Clínica veterinária, banho e tosa e entrega na região do {regions}. Fale com a equipe e conte o que o seu
              pet precisa.
            </p>

            {open24h.informedByProfile && (
              <p className="pf-badge">
                <Icon name="clock" />
                <span>
                  <strong>Clínica veterinária 24 horas</strong>
                  {!open24h.confirmed && <small>segundo o perfil {pf.instagram.handle}</small>}
                </span>
                {!open24h.confirmed && <Pending>a confirmar</Pending>}
              </p>
            )}

            <div className="pf-actions">
              {whatsapp ? (
                <WhatsappButton url={whatsapp} />
              ) : (
                <External href={pf.instagram.url} className="pf-button">
                  <Icon name="instagram" /> Falar pelo Instagram
                </External>
              )}
              {!whatsapp && <WhatsappButton url={null} />}
            </div>
          </div>

          <figure className="pf-hero-photo">
            <img src={pf.images.hero.src} alt={pf.images.hero.alt} width="1000" height="1250" />
            <span className="pf-sticker" aria-hidden="true">
              <Icon name="heart" />
              com muito
              <br />
              carinho
            </span>
            {pf.images.hero.illustrative && <figcaption>Imagem ilustrativa</figcaption>}
          </figure>
        </section>

        {/* SERVIÇOS EM RESUMO */}
        <ul className="pf-strip pf-container" aria-label="Serviços">
          <li>
            <a href="#clinica">
              <Icon name="cross" /> Clínica veterinária
            </a>
          </li>
          <li>
            <a href="#banho-e-tosa">
              <Icon name="bath" /> Banho e tosa
            </a>
          </li>
          <li>
            <a href="#entrega">
              <Icon name="truck" /> Entrega na região
            </a>
          </li>
        </ul>

        {/* CLÍNICA */}
        <section className="pf-section pf-clinic" id="clinica" aria-labelledby="pf-clinica-title">
          <div className="pf-container pf-two">
            <div>
              <p className="pf-eyebrow">Clínica veterinária</p>
              <h2 id="pf-clinica-title">
                {open24h.confirmed ? "Atendimento a qualquer hora." : "Atendimento veterinário perto de você."}
              </h2>
              <p className="pf-text">{pf.clinic.text}</p>
              {open24h.informedByProfile && !open24h.confirmed && (
                <p className="pf-note">
                  O perfil {pf.instagram.handle} informa atendimento 24 horas. Antes de ir, confirme com a equipe se há
                  atendimento no horário que você precisa.
                </p>
              )}
            </div>
            <div className="pf-card">
              <h3>Como falar com a clínica</h3>
              <dl className="pf-facts">
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    {whatsapp ? (
                      <External href={whatsapp}>Abrir conversa</External>
                    ) : (
                      <Pending>número a confirmar</Pending>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Telefone</dt>
                  <dd>{phone ? <a href={phone}>{pf.phone}</a> : <Pending>a confirmar</Pending>}</dd>
                </div>
                <div>
                  <dt>Endereço</dt>
                  <dd>{pf.address || <Pending>a confirmar</Pending>}</dd>
                </div>
                <div>
                  <dt>Instagram</dt>
                  <dd>
                    <External href={pf.instagram.url}>{pf.instagram.handle}</External>
                  </dd>
                </div>
              </dl>
              {maps && (
                <External href={maps} className="pf-button pf-button-block">
                  <Icon name="pin" /> Como chegar
                </External>
              )}
            </div>
          </div>
        </section>

        {/* BANHO E TOSA */}
        <section className="pf-section" id="banho-e-tosa" aria-labelledby="pf-banho-title">
          <div className="pf-container pf-two pf-two-photo">
            <figure className="pf-photo">
              <img
                src={pf.images.grooming.src}
                alt={pf.images.grooming.alt}
                width="1000"
                height="1000"
                loading="lazy"
                decoding="async"
              />
              {pf.images.grooming.illustrative && <figcaption>Imagem ilustrativa</figcaption>}
            </figure>
            <div>
              <p className="pf-eyebrow">Banho e tosa</p>
              <h2 id="pf-banho-title">Limpinho, cheiroso e bem cuidado.</h2>
              <p className="pf-text">{pf.grooming.text}</p>
              <External href={whatsapp ?? pf.instagram.url} className="pf-link">
                Combinar com a equipe <Icon name="arrow" />
              </External>
            </div>
          </div>
        </section>

        {/* ENTREGA */}
        <section className="pf-section pf-delivery" id="entrega" aria-labelledby="pf-entrega-title">
          <div className="pf-container pf-two">
            <div>
              <p className="pf-eyebrow">Entrega</p>
              <h2 id="pf-entrega-title">Entrega no {regions}.</h2>
              <p className="pf-text">{pf.delivery.text}</p>
              <ul className="pf-regions" aria-label="Regiões informadas no perfil">
                {pf.regions.map((region) => (
                  <li key={region}>
                    <Icon name="pin" /> {region}
                  </li>
                ))}
              </ul>
            </div>
            {pf.demo && pf.delivery.pending.length > 0 && (
              <div className="pf-card pf-card-dashed">
                <h3>A confirmar com a equipe</h3>
                <ul className="pf-list">
                  {pf.delivery.pending.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* SOBRE */}
        <section className="pf-section pf-about" aria-labelledby="pf-sobre-title">
          <div className="pf-container pf-narrow">
            <p className="pf-eyebrow">Sobre a {pf.name}</p>
            <h2 id="pf-sobre-title">{pf.about.title}</h2>
            <p className="pf-text">{pf.about.text}</p>
            {pf.about.provisional && (
              <p className="pf-note">
                <Pending>texto provisório</Pending> A história da {pf.name} entra aqui depois de enviada e aprovada pela
                equipe.
              </p>
            )}
          </div>
        </section>

        {/* CONTATO */}
        <section className="pf-section pf-contact" id="contato" aria-labelledby="pf-contato-title">
          <div className="pf-container pf-two">
            <div>
              <p className="pf-eyebrow">Localização e contato</p>
              <h2 id="pf-contato-title">Fale com a {pf.name}.</h2>
              <p className="pf-text">
                {pf.address
                  ? pf.address
                  : `Atendimento na região do ${regions}, em ${pf.city}. O endereço da clínica será publicado aqui depois de confirmado.`}
              </p>
              {maps && (
                <External href={maps} className="pf-link">
                  Como chegar <Icon name="arrow" />
                </External>
              )}
            </div>
            <div className="pf-card">
              <h3>Canais de contato</h3>
              <div className="pf-stack">
                <WhatsappButton url={whatsapp} block />
                {phone && (
                  <a href={phone} className="pf-button pf-button-ghost pf-button-block">
                    Ligar: {pf.phone}
                  </a>
                )}
                <External
                  href={pf.instagram.url}
                  className={`pf-button pf-button-block${whatsapp ? " pf-button-ghost" : ""}`}
                >
                  <Icon name="instagram" /> Instagram {pf.instagram.handle}
                </External>
              </div>
              {pf.demo && (
                <>
                  <p className="pf-note">Pendente de confirmação pela equipe:</p>
                  <ul className="pf-list">
                    {pf.pending.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <div className="pf-container pf-footer-inner">
          <p className="pf-brand">
            <span className="pf-brand-mark">
              <Icon name="paw" />
            </span>
            {pf.name}
          </p>
          <ul>
            <li>
              <External href={pf.instagram.url}>Instagram {pf.instagram.handle}</External>
            </li>
            {whatsapp && (
              <li>
                <External href={whatsapp}>WhatsApp</External>
              </li>
            )}
          </ul>
        </div>
        {pf.demo && (
          <p className="pf-container pf-disclaimer">
            Página de demonstração independente, criada como proposta. Não é o site oficial da {pf.name} e não foi
            revisada nem aprovada pela equipe. Esta página não oferece orientação veterinária.
          </p>
        )}
      </footer>
    </div>
  );
}
