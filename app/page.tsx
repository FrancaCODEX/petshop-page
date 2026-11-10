import { business as b, mapsUrl, whatsappUrl } from "@/config/business";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
export default function Home() {
  const whatsapp = whatsappUrl(),
    maps = mapsUrl();
  const reviews = b.reviews.filter(
    (r) => r.approved && /^https:\/\//.test(r.sourceUrl),
  );
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      {b.demo && (
        <div className="demo-bar">
          Um projeto cheio de afeto.{" "}
          <span>Site demonstrativo • marca e conteúdo provisórios</span>
        </div>
      )}
      <Header contactUrl={whatsapp} />
      <main id="conteudo">
        <section
          className="hero container"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" /> PARA QUEM É PARTE DA FAMÍLIA
            </p>
            <h1 id="hero-title">
              {b.hero.title}
              <br />
              <span>{b.hero.accent}</span>
            </h1>
            <p className="hero-description">{b.hero.text}</p>
            <div className="hero-actions">
              <a className="button" href={whatsapp ?? "#contato"}>
                <Icon name="chat" /> Falar pelo WhatsApp <Icon name="arrow" />
              </a>
              <a className="text-link" href="#servicos">
                Conheça os cuidados <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="hero-note">
              <Icon name="heart" />
              <span>
                Uma vida mais leve.
                <br />
                <strong>Uma companhia que vale tudo.</strong>
              </span>
            </div>
          </div>
          <figure className="hero-visual">
            <div className="photo-frame">
              <img
                src={b.images.hero.src}
                alt={b.images.hero.alt}
                width="1000"
                height="1120"
                fetchPriority="high"
              />
              {b.images.hero.provisional && (
                <span className="photo-label">Foto ilustrativa</span>
              )}
            </div>
            <div className="love-stamp">
              <Icon name="sun" />
              <span>
                mais carinho
                <br />
                <strong>por aqui.</strong>
              </span>
            </div>
            <div className="floating-note">
              <span className="heart-circle">
                <Icon name="heart" />
              </span>
              O melhor lugar é<br />
              <strong>perto de quem cuida.</strong>
            </div>
            <span className="decor-spark" aria-hidden="true">
              ✳
            </span>
          </figure>
        </section>
        <div className="ribbon" aria-hidden="true">
          <div>
            Carinho em cada detalhe <span>✳</span> Bons momentos juntos{" "}
            <span>✳</span> Cuidado que aproxima <span>✳</span> Carinho em cada
            detalhe <span>✳</span>
          </div>
        </div>
        <section
          className="section container"
          id="servicos"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">CUIDADOS & COMPANHIA</p>
              <h2 id="services-title">
                Um cuidado para
                <br />
                cada momento.
              </h2>
            </div>
            <div className="heading-aside">
              <p>
                Da rotina aos pequenos rituais,
                <br />o carinho está nos detalhes.
              </p>
              {b.services.some((s) => s.provisional) && (
                <span className="provisional">
                  Serviços ilustrativos • sujeitos à confirmação
                </span>
              )}
            </div>
          </div>
          <div className="services-grid">
            {b.services.map((s, i) => (
              <article className="service-card" key={s.title}>
                <div className="card-top">
                  <span className="icon-box">
                    <Icon name={s.icon} />
                  </span>
                  <span className="card-number">0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                {s.provisional && (
                  <span className="provisional">Exemplo de serviço</span>
                )}
                <a
                  className="service-link"
                  href={whatsapp ?? "#contato"}
                  aria-label={`Consultar informações sobre ${s.title}`}
                >
                  Saber mais <Icon name="arrow" />
                </a>
              </article>
            ))}
            <aside className="service-invite">
              <Icon name="chat" />
              <h3>
                Cada pet tem
                <br />
                seu jeitinho.
              </h3>
              <p>
                Tem uma dúvida ou quer entender melhor um cuidado? A conversa
                começa por aqui.
              </p>
              <a className="text-link" href={whatsapp ?? "#contato"}>
                Vamos conversar <Icon name="arrow" />
              </a>
            </aside>
          </div>
        </section>
        {b.products.enabled && (
          <section
            className="products-section"
            id="produtos"
            aria-labelledby="products-title"
          >
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">PARA O DIA A DIA DELES</p>
                  <h2 id="products-title">
                    Entre o brincar
                    <br />e o aconchegar.
                  </h2>
                </div>
                <div className="heading-aside">
                  <p>{b.products.intro}</p>
                  {b.products.categories.some((c) => c.provisional) && (
                    <span className="provisional">
                      Categorias demonstrativas • disponibilidade a confirmar
                    </span>
                  )}
                </div>
              </div>
              <div className="products-grid">
                {b.products.categories.map((c) => (
                  <article key={c.title} className="product-card">
                    <div className={`product-art art-${c.icon}`}>
                      <Icon name={c.icon} />
                      <span aria-hidden="true">✳</span>
                    </div>
                    <div className="product-caption">
                      <h3>{c.title}</h3>
                      <p>{c.description}</p>
                      {c.provisional && <small>Categoria provisória</small>}
                    </div>
                  </article>
                ))}
              </div>
              <p className="products-note">
                Quer saber o que tem na loja?{" "}
                <a href={whatsapp ?? "#contato"}>Consulte pelo WhatsApp ↗</a>
              </p>
            </div>
          </section>
        )}
        <section
          className="section container about-grid"
          id="sobre"
          aria-labelledby="about-title"
        >
          <figure className="about-photo">
            <img
              src={b.images.about.src}
              alt={b.images.about.alt}
              width="800"
              height="800"
              loading="lazy"
            />
            {b.images.about.provisional && (
              <figcaption>Foto ilustrativa • não representa a loja</figcaption>
            )}
            <span className="about-sticker" aria-hidden="true">
              bom mesmo
              <br />é estar junto ♡
            </span>
          </figure>
          <div className="about-copy">
            <p className="eyebrow">UM POUCO SOBRE NÓS</p>
            <h2 id="about-title">{b.about.title}</h2>
            <p>{b.about.text}</p>
            <p>{b.description}</p>
            {b.demo && (
              <p className="provisional about-disclaimer">{b.about.note}</p>
            )}
            <a className="text-link" href="#localizacao">
              Venha conhecer <Icon name="arrow" />
            </a>
          </div>
        </section>
        {reviews.length > 0 && (
          <section
            className="section container"
            aria-labelledby="reviews-title"
          >
            <p className="eyebrow">BONS ENCONTROS</p>
            <h2 id="reviews-title">Quem já passou por aqui</h2>
            <div className="services-grid">
              {reviews.map((r) => (
                <figure className="service-card" key={r.sourceUrl}>
                  <blockquote>{r.quote}</blockquote>
                  <figcaption>
                    {r.name} ·{" "}
                    <a
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver avaliação original
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        <section
          className="contact-section"
          id="localizacao"
          aria-labelledby="location-title"
        >
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">A GENTE SE ENCONTRA POR AQUI</p>
              <h2 id="location-title">
                Pode chegar.
                <br />E trazer seu melhor amigo.
              </h2>
              <p>
                Uma visita, uma dúvida, um próximo cuidado.
                <br />
                Vamos começar com uma boa conversa.
              </p>
              <div className="location-details">
                <Icon name="pin" />
                <div>
                  <strong>{b.address || "Endereço a confirmar"}</strong>
                  <p>
                    {b.address
                      ? "Planeje sua visita e encontre o melhor caminho."
                      : "A localização será exibida quando os dados da loja forem aprovados."}
                  </p>
                  {maps && (
                    <a
                      className="text-link"
                      href={maps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Como chegar <Icon name="arrow" />
                    </a>
                  )}
                </div>
              </div>
              {b.hours.length > 0 && (
                <div className="hours">
                  <strong>Horários de atendimento</strong>
                  {b.hours.map((h) => (
                    <p key={h}>{h}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="contact-card" id="contato">
              <span className="icon-box">
                <Icon name="chat" />
              </span>
              <h3>
                Oi! Como podemos
                <br />
                ajudar você e seu pet?
              </h3>
              <p>
                Saiba mais sobre os cuidados, consulte produtos ou pergunte o
                que precisar.
              </p>
              {whatsapp ? (
                <a
                  className="button"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="chat" /> Abrir WhatsApp <Icon name="arrow" />
                </a>
              ) : (
                <>
                  <button
                    className="button"
                    disabled
                    aria-describedby="contact-pending"
                  >
                    <Icon name="chat" /> WhatsApp em breve
                  </button>
                  <small id="contact-pending">
                    Demonstração: número de contato ainda não configurado.
                  </small>
                </>
              )}
              {b.phone && (
                <a href={`tel:${b.phone.replace(/[^+\d]/g, "")}`}>{b.phone}</a>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-top">
          <a href="#inicio" className="brand">
            <span className="brand-mark">
              <Icon name="heart" />
            </span>
            <span>
              {b.name}
              <small>{b.tagline}</small>
            </span>
          </a>
          <p>Para eles, todo o nosso afeto.</p>
          <div className="footer-socials">
            {b.socials
              .filter((s) => /^https:\/\//.test(s.url))
              .map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label} ↗
                </a>
              ))}
            <a href="#inicio">Voltar ao topo ↑</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            {b.demo
              ? "Conceito demonstrativo. Sem vínculo com um pet shop real."
              : b.name}
          </span>
          <span>Feito para boas companhias. ♡</span>
        </div>
      </footer>
    </>
  );
}
