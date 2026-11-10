import type { Metadata } from "next";
import {
  petFamily as p,
  petFamilyWhatsAppUrl,
  petFamilyMapsUrl,
  petFamilyPhoneUrl,
  petFamilyInstagramUrl,
} from "@/config/pet-family-dark";
import { PetFamilyHeader } from "@/components/pet-family/header";
import { Icon } from "@/components/icon";
import "./pet-family-dark.css";
export const metadata: Metadata = {
  title: "Pet’s Family — demonstração independente",
  description:
    "Demonstração para a Pet’s Family: clínica veterinária, banho e tosa e entrega no Grajaú e Apurá. Informações sujeitas à confirmação da equipe.",
  robots: { index: false, follow: false },
};
export default function PetFamilyPage() {
  const whatsapp = petFamilyWhatsAppUrl(),
    maps = petFamilyMapsUrl(),
    phone = petFamilyPhoneUrl(),
    instagram = petFamilyInstagramUrl();
  return (
    <div className="pfd">
      <a className="pfd-skip" href="#pfd-conteudo">
        Pular para o conteúdo
      </a>
      {p.demo && (
        <div className="pfd-demo">
          DEMONSTRAÇÃO INDEPENDENTE{" "}
          <span>Não é o site oficial. Informações sujeitas à confirmação.</span>
        </div>
      )}
      <PetFamilyHeader name={p.name} />
      <main id="pfd-conteudo">
        <section
          className="pfd-container pfd-hero"
          id="pfd-inicio"
          aria-labelledby="pfd-title"
        >
          <div className="pfd-hero-copy">
            <p className="pfd-eyebrow">
              <span /> PET’S FAMILY · SÃO PAULO
            </p>
            <h1 id="pfd-title">
              Cuidado para
              <br />
              quem é da <em>família.</em>
            </h1>
            <p className="pfd-lead">{p.hero.description}</p>
            <div className="pfd-hero-actions">
              {whatsapp ? (
                <a
                  className="pfd-button"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="chat" /> Falar com a equipe <Icon name="arrow" />
                </a>
              ) : (
                <button
                  className="pfd-button"
                  disabled
                  aria-describedby="pfd-hero-pending"
                >
                  <Icon name="chat" /> WhatsApp a confirmar
                </button>
              )}
              <a className="pfd-text-link" href="#pfd-clinica">
                Conheça os serviços <span aria-hidden="true">↘</span>
              </a>
            </div>
            {!whatsapp && (
              <p id="pfd-hero-pending" className="pfd-small">
                Contato provisório. O botão será ativado após a confirmação do
                número oficial.
              </p>
            )}
            <div className="pfd-hero-region">
              <Icon name="pin" />
              <span>
                Grajaú & Apurá{" "}
                <small>Região de entrega informada no perfil</small>
              </span>
            </div>
          </div>
          <figure className="pfd-hero-art">
            <span className="pfd-art-kicker">
              BONS COMPANHEIROS. GRANDES AFETOS.
            </span>
            <img
              src={p.image.src}
              alt={p.image.alt}
              width="640"
              height="680"
              fetchPriority="high"
            />
            <figcaption>Ilustração original · imagem demonstrativa</figcaption>
            <div className="pfd-art-note">
              <Icon name="heart" />
              <span>
                É sobre cuidar.
                <br />
                <strong>É sobre família.</strong>
              </span>
            </div>
          </figure>
        </section>
        <div className="pfd-service-strip">
          <div className="pfd-container">
            <span>
              <Icon name="heart" /> Clínica veterinária
            </span>
            <span>
              <Icon name="scissors" /> Banho e tosa
            </span>
            <span>
              <Icon name="bowl" /> Entrega na região
            </span>
          </div>
        </div>
        <section
          className="pfd-container pfd-section pfd-clinic"
          id="pfd-clinica"
          aria-labelledby="pfd-clinic-title"
        >
          <div>
            <p className="pfd-eyebrow">01 / CLÍNICA VETERINÁRIA</p>
            <h2 id="pfd-clinic-title">
              A atenção começa
              <br />
              com uma boa <em>conversa.</em>
            </h2>
            <p className="pfd-body-copy">{p.clinic.description}</p>
            <a className="pfd-text-link" href="#pfd-contato">
              Ver informações de contato <Icon name="arrow" />
            </a>
          </div>
          <aside className="pfd-hours-card">
            <div className="pfd-hours-top">
              <Icon name="sun" />
              <span>INFORMAÇÃO DO PERFIL</span>
            </div>
            {p.clinic.hours24Confirmed ? (
              <>
                <strong className="pfd-hours-number">
                  24<small>horas</small>
                </strong>
                <h3>Clínica veterinária 24 horas</h3>
                <p>Informação de funcionamento confirmada pela equipe.</p>
              </>
            ) : (
              <>
                <strong className="pfd-hours-number">
                  24<small>horas?</small>
                </strong>
                <h3>A confirmar com a equipe</h3>
                <p>
                  {p.clinic.hours24Reported
                    ? "O perfil divulga clínica veterinária 24 horas. Essa informação ainda precisa ser confirmada diretamente com a Pet’s Family."
                    : "O horário de funcionamento ainda precisa ser informado pela equipe."}
                </p>
                <span className="pfd-status">Confirmação pendente</span>
              </>
            )}
            <p className="pfd-hours-foot">
              Telefone e endereço serão exibidos após confirmação.
            </p>
          </aside>
        </section>
        <section className="pfd-care-section">
          <div className="pfd-container pfd-care-heading">
            <p className="pfd-eyebrow">OS PEQUENOS CUIDADOS TAMBÉM CONTAM</p>
            <h2>
              Da rotina de carinho
              <br />
              ao que chega <em>até você.</em>
            </h2>
          </div>
          <div className="pfd-container pfd-care-grid">
            <article className="pfd-care-card" id="pfd-banho">
              <div className="pfd-card-top">
                <span className="pfd-icon-box">
                  <Icon name="scissors" />
                </span>
                <span>02 / BEM-ESTAR</span>
              </div>
              <h3>{p.grooming.title}</h3>
              <p>{p.grooming.description}</p>
              {!p.grooming.confirmed && (
                <p className="pfd-care-note">
                  Modalidades, valores e disponibilidade a confirmar com a
                  equipe.
                </p>
              )}
              <a className="pfd-text-link" href="#pfd-contato">
                Consultar informações <Icon name="arrow" />
              </a>
            </article>
            <article className="pfd-care-card pfd-delivery-card" id="pfd-entrega">
              <div className="pfd-card-top">
                <span className="pfd-icon-box">
                  <Icon name="bowl" />
                </span>
                <span>03 / MAIS PERTO</span>
              </div>
              <h3>
                Entrega no {p.delivery.regions[0]}
                <br />e em {p.delivery.regions[1]}.
              </h3>
              <p>
                Conforme o perfil, a Pet’s Family divulga entrega nessa região
                de {p.delivery.city}.
              </p>
              <p className="pfd-care-note">{p.delivery.conditions}</p>
              <a className="pfd-text-link" href="#pfd-contato">
                Ver como entrar em contato <Icon name="arrow" />
              </a>
            </article>
          </div>
        </section>
        <section
          className="pfd-container pfd-section pfd-contact"
          id="pfd-contato"
          aria-labelledby="pfd-contact-title"
        >
          <div>
            <p className="pfd-eyebrow">UM PRÓXIMO PASSO, COM CLAREZA</p>
            <h2 id="pfd-contact-title">
              Vamos falar sobre
              <br />o seu <em>melhor amigo?</em>
            </h2>
            <p className="pfd-body-copy">
              Os canais abaixo serão ativados quando os dados oficiais forem
              confirmados. Esta página é uma apresentação demonstrativa.
            </p>
            <div className="pfd-location">
              <Icon name="pin" />
              <div>
                <h3>
                  {maps
                    ? p.contact.address.value
                    : "Endereço ainda não confirmado"}
                </h3>
                <p>
                  {maps
                    ? "Consulte a rota antes de planejar sua visita."
                    : "Grajaú e Apurá são as regiões de entrega informadas no perfil, não um endereço da clínica."}
                </p>
                {maps && (
                  <a
                    className="pfd-text-link"
                    href={maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Como chegar <Icon name="arrow" />
                  </a>
                )}
              </div>
            </div>
            {p.contact.hours.length > 0 && (
              <div className="pfd-schedule">
                <strong>Horários confirmados</strong>
                {p.contact.hours.map((h) => (
                  <p key={h}>{h}</p>
                ))}
              </div>
            )}
          </div>
          <div className="pfd-contact-panel">
            <div className="pfd-contact-row">
              <Icon name="chat" />
              <div>
                <h3>WhatsApp</h3>
                <p>
                  {whatsapp
                    ? "Converse com a equipe pelo canal confirmado."
                    : "Número oficial a confirmar."}
                </p>
              </div>
            </div>
            {whatsapp ? (
              <a
                className="pfd-button"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir WhatsApp <Icon name="arrow" />
              </a>
            ) : (
              <>
                <button
                  className="pfd-button"
                  disabled
                  aria-describedby="pfd-contact-pending"
                >
                  Contato ainda não disponível
                </button>
                <p id="pfd-contact-pending" className="pfd-small">
                  Nenhum número demonstrativo é utilizado.
                </p>
              </>
            )}
            {phone && (
              <a className="pfd-phone" href={phone}>
                Ligar: {p.contact.phone.number}
              </a>
            )}
            <div className="pfd-instagram">
              <span>INSTAGRAM INFORMADO NO PERFIL</span>
              {instagram ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  {p.instagram.handle} ↗
                </a>
              ) : (
                <>
                  <strong>{p.instagram.handle}</strong>
                  <p>Vínculo oficial a confirmar antes de ativar o link.</p>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="pfd-confirmation">
          <div className="pfd-container">
            <span className="pfd-confirmation-symbol" aria-hidden="true">
              i
            </span>
            <div>
              <h2>Uma demonstração, feita com responsabilidade.</h2>
              <p>
                {p.source} Telefone, endereço, funcionamento 24h e condições da
                entrega aguardam aprovação. A ilustração é demonstrativa e não
                representa a estrutura ou a equipe da clínica.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="pfd-footer">
        <div className="pfd-container">
          <a className="pfd-brand" href="#pfd-inicio">
            <span className="pfd-monogram" aria-hidden="true">
              pf<span>✦</span>
            </span>
            <span>
              {p.name}
              <small>DEMONSTRAÇÃO INDEPENDENTE</small>
            </span>
          </a>
          <p>Afeto é o que nos aproxima.</p>
          <a className="pfd-text-link" href="#pfd-inicio">
            Voltar ao topo ↑
          </a>
        </div>
        <div className="pfd-container pfd-footer-bottom">
          <span>Conceito visual sujeito à aprovação da Pet’s Family.</span>
          <a href="/">Ver demonstração genérica ↗</a>
        </div>
      </footer>
    </div>
  );
}
