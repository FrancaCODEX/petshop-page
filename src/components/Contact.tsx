import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  PawPrint,
  Phone,
} from "lucide-react";
import { Brand, Photo } from "./UI";

export function Contact({
  onMap,
  onContact,
}: {
  onMap: () => void;
  onContact: () => void;
}) {
  return (
    <section
      className="contact-section"
      id="contato"
      aria-labelledby="contact-title"
    >
      <div className="container contact-grid">
        <div className="contact-copy">
          <h2 id="contact-title">
            Seu pet é de casa
            <br />
            por aqui.
          </h2>
          <p>Estamos esperando vocês para uma visita.</p>
          <div className="contact-details">
            <div>
              <MapPin size={22} aria-hidden="true" />
              <div>
                <h3>Onde estamos</h3>
                <p>
                  Av. das Patas, 123 · Centro
                  <br />
                  São Paulo — SP
                </p>
              </div>
            </div>
            <div>
              <Clock3 size={22} aria-hidden="true" />
              <div>
                <h3>Horários da referência</h3>
                <p>
                  Segunda a sábado: 8h às 20h
                  <br />
                  Domingo: 9h às 17h
                </p>
              </div>
            </div>
            <div>
              <Phone size={22} aria-hidden="true" />
              <div>
                <h3>Telefone da referência</h3>
                <p>(11) 99999-1234</p>
              </div>
            </div>
            <div>
              <Mail size={22} aria-hidden="true" />
              <div>
                <h3>E-mail da referência</h3>
                <p>contato@petamigo.com.br</p>
              </div>
            </div>
          </div>
          <div className="contact-actions">
            <button className="button" onClick={onContact}>
              Falar com a equipe
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <button className="text-link" onClick={onMap}>
              Ver localização
              <MapPin size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="contact-note">
            Endereço, horários e contatos ilustrativos da referência. Confirme
            os dados reais antes de uma visita.
          </p>
        </div>
        <div className="contact-photo">
          <Photo
            name="storefront"
            alt="Fachada ilustrativa da PetAmigo, com letreiro verde-petróleo e toldo coral"
            width={800}
            height={500}
          />
          <div className="contact-photo-label">
            <PawPrint size={24} aria-hidden="true" />
            <span>
              Um lugar de cuidado.
              <br />
              <strong>Um mundo de amizade.</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand light />
            <p>
              Serviços, saúde e bem-estar.
              <br />
              Sempre perto do seu melhor amigo.
            </p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <div>
              <h2>PetAmigo</h2>
              <a href="#servicos">Nossos serviços</a>
              <a href="#loja">Produtos em destaque</a>
              <a href="#clube">Clube PetAmigo</a>
            </div>
            <div>
              <h2>Vamos conversar?</h2>
              <a href="#adocao">Adoção responsável</a>
              <a href="#blog">Blog e dicas</a>
              <a href="#contato">Localização e contato</a>
            </div>
          </nav>
          <Photo
            name="footer-pets"
            alt="Cão e gato juntinhos"
            width={360}
            height={182}
          />
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} PetAmigo. Feito com carinho pelos pets.
          </span>
          <span>Site de demonstração · Sem transações reais</span>
        </div>
      </div>
    </footer>
  );
}
