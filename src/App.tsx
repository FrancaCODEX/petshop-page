import { useState } from "react";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { products, money } from "./data";
import type { Article, Product } from "./data";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Shop } from "./components/Shop";
import { Club } from "./components/Club";
import { Stories } from "./components/Stories";
import { Adoption } from "./components/Adoption";
import { Blog } from "./components/Blog";
import { Contact, Footer } from "./components/Contact";
import { DemoNote, Modal, Photo } from "./components/UI";
import { DemoForm } from "./components/Forms";

type Overlay =
  | { kind: "booking"; service?: string }
  | { kind: "product"; product: Product }
  | { kind: "article"; article: Article }
  | { kind: "adoption" | "club" | "map" | "contact" | "cart" };
export default function App() {
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const count = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const close = () => setOverlay(null);
  const book = (service?: string) => setOverlay({ kind: "booking", service });
  const changeQuantity = (id: string, difference: number) =>
    setCart((current) => {
      const next = { ...current };
      const quantity = Math.max(0, Math.min(10, (next[id] || 0) + difference));
      if (quantity) next[id] = quantity;
      else delete next[id];
      return next;
    });
  return (
    <>
      <Header
        count={count}
        onCart={() => setOverlay({ kind: "cart" })}
        onBook={() => book()}
      />
      <main id="conteudo">
        <Hero onBook={() => book()} />
        <Services onBook={book} />
        <Shop
          onProduct={(product) => setOverlay({ kind: "product", product })}
          onCart={() => setOverlay({ kind: "cart" })}
        />
        <Club onDetails={() => setOverlay({ kind: "club" })} />
        <Stories onBook={() => book("Banho e tosa")} />
        <Adoption onMeet={() => setOverlay({ kind: "adoption" })} />
        <Blog onRead={(article) => setOverlay({ kind: "article", article })} />
        <Contact
          onMap={() => setOverlay({ kind: "map" })}
          onContact={() => setOverlay({ kind: "contact" })}
        />
      </main>
      <Footer />
      {overlay?.kind === "booking" && (
        <Modal title="Um cuidado para o seu pet." onClose={close}>
          <p className="modal-intro">
            Escolha um serviço e experimente o agendamento.
          </p>
          <DemoForm type="booking" initialService={overlay.service} />
        </Modal>
      )}
      {overlay?.kind === "product" && (
        <ProductDetails
          key={overlay.product.id}
          product={overlay.product}
          onClose={close}
          quantity={cart[overlay.product.id] || 0}
          onAdd={() => changeQuantity(overlay.product.id, 1)}
        />
      )}
      {overlay?.kind === "cart" && (
        <Modal title="Sua sacola de demonstração" onClose={close}>
          <DemoNote>
            Uma seleção para experimentar. Não há checkout, pagamento, pedido ou
            entrega reais. A sacola é apagada ao recarregar a página.
          </DemoNote>
          {count === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={42} aria-hidden="true" />
              <h3>Ainda tem espaço para um mimo.</h3>
              <p>Conheça os produtos em destaque e monte uma seleção.</p>
              <button
                className="button"
                onClick={() => {
                  close();
                  document.getElementById("loja")?.scrollIntoView();
                }}
              >
                Ver produtos
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <>
              <ul className="cart-list">
                {products
                  .filter((product) => cart[product.id])
                  .map((product) => (
                    <li key={product.id}>
                      <Photo
                        name={product.image}
                        alt={product.name}
                        width={72}
                        height={80}
                      />
                      <div className="cart-info">
                        <h3>{product.name}</h3>
                        <p>{money(product.price)}</p>
                        <div className="quantity-control">
                          <button
                            className="icon-button"
                            onClick={() => changeQuantity(product.id, -1)}
                            aria-label={`Diminuir quantidade de ${product.name}`}
                          >
                            <Minus size={16} aria-hidden="true" />
                          </button>
                          <span
                            aria-label={`Quantidade de ${product.name}`}
                            aria-live="polite"
                          >
                            {cart[product.id]}
                          </span>
                          <button
                            className="icon-button"
                            onClick={() => changeQuantity(product.id, 1)}
                            disabled={cart[product.id] >= 10}
                            aria-label={`Aumentar quantidade de ${product.name}`}
                          >
                            <Plus size={16} aria-hidden="true" />
                          </button>
                          <button
                            className="icon-button"
                            onClick={() =>
                              setCart((current) => {
                                const next = { ...current };
                                delete next[product.id];
                                return next;
                              })
                            }
                            aria-label={`Remover ${product.name} da sacola`}
                          >
                            <Trash2 size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <strong>{money(product.price * cart[product.id])}</strong>
                    </li>
                  ))}
              </ul>
              <div className="cart-total">
                <span>Total simulado</span>
                <strong>
                  {money(
                    products.reduce(
                      (sum, product) =>
                        sum + product.price * (cart[product.id] || 0),
                      0,
                    ),
                  )}
                </strong>
              </div>
              <p className="muted">
                Limite demonstrativo de 10 unidades por produto. Esta seleção
                não gera uma compra.
              </p>
              <button
                className="button button-outline full-width"
                onClick={close}
              >
                Continuar visitando
              </button>
            </>
          )}
        </Modal>
      )}
      {overlay?.kind === "club" && (
        <Modal title="Clube PetAmigo" onClose={close}>
          <div className="club-modal">
            <Photo
              name="club-dog"
              alt="Cão com óculos escuros e coroa"
              width={200}
              height={190}
            />
            <div>
              <h3>Mais cuidado na rotina.</h3>
              <p>
                A referência apresenta uma assinatura mensal com descontos na
                loja, prioridade no agendamento, preços especiais em banho e
                tosa e brindes.
              </p>
            </div>
          </div>
          <DemoNote>
            Apresentação demonstrativa. Valores, regras, disponibilidade e
            contratação do clube ainda não foram definidos. Nenhuma assinatura é
            realizada neste site.
          </DemoNote>
          <button className="button full-width" onClick={close}>
            Continuar conhecendo a PetAmigo
          </button>
        </Modal>
      )}
      {overlay?.kind === "adoption" && (
        <Modal title="A próxima amiga pode ser a Luna." onClose={close}>
          <div className="luna-profile">
            <Photo
              name="adoption-luna"
              alt="Luna, gata tigrada"
              width={180}
              height={150}
            />
            <div>
              <h3>
                Luna <span aria-label="fêmea">♀</span>
              </h3>
              <p>2 anos · Castrada</p>
              <p>Dócil, carinhosa e pronta para um novo lar.</p>
            </div>
          </div>
          <h3 className="form-subheading">Conte um pouco sobre você.</h3>
          <DemoForm type="adoption" />
        </Modal>
      )}
      {overlay?.kind === "article" && (
        <Modal title={overlay.article.title} onClose={close} wide>
          <article className="article-content">
            <Photo
              className={`article-cover article-cover-${overlay.article.id}`}
              name={overlay.article.image}
              alt={
                overlay.article.id === "higiene"
                  ? "Cão com toalha após o banho"
                  : ""
              }
              width={850}
              height={340}
            />
            <p className="article-intro">{overlay.article.intro}</p>
            {overlay.article.sections.map(([title, text]) => (
              <section key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </section>
            ))}
            <p className="article-disclaimer">
              Conteúdo educativo desenvolvido para esta demonstração a partir
              dos temas da referência. Não substitui avaliação veterinária.
            </p>
          </article>
        </Modal>
      )}
      {overlay?.kind === "map" && (
        <Modal title="Onde encontrar a PetAmigo" onClose={close}>
          <Photo
            className="map-image"
            name="map"
            alt="Mapa ilustrativo da referência com marcador de pata; não representa uma rota real"
            width={700}
            height={460}
          />
          <h3>Av. das Patas, 123 · Centro</h3>
          <p>São Paulo — SP</p>
          <DemoNote>
            O endereço e o mapa pertencem à prancha de design e são
            ilustrativos. A localização real precisa ser confirmada antes de
            oferecer rotas ou planejar uma visita.
          </DemoNote>
          <button className="button button-outline" onClick={close}>
            Voltar para o site
          </button>
        </Modal>
      )}
      {overlay?.kind === "contact" && (
        <Modal title="Vamos conversar?" onClose={close}>
          <DemoForm type="contact" />
        </Modal>
      )}
    </>
  );
}
function ProductDetails({
  product,
  onClose,
  onAdd,
  quantity,
}: {
  product: Product;
  onClose: () => void;
  onAdd: () => void;
  quantity: number;
}) {
  const [added, setAdded] = useState(false);
  return (
    <Modal title={product.name} onClose={onClose}>
      <div className="product-modal-image">
        <Photo
          name={product.image}
          alt={product.name}
          width={400}
          height={290}
        />
      </div>
      <p className="product-modal-detail">{product.detail}</p>
      <strong className="product-modal-price">{money(product.price)}</strong>
      <p className="product-description">{product.description}</p>
      <DemoNote>
        Produto e valor da referência. Demonstração sem estoque, pagamento ou
        compra real.
      </DemoNote>
      <button
        className="button full-width"
        disabled={quantity >= 10}
        onClick={() => {
          onAdd();
          setAdded(true);
        }}
      >
        {quantity >= 10 ? (
          "Limite de 10 unidades atingido"
        ) : (
          <>
            {added ? (
              <Check size={19} aria-hidden="true" />
            ) : (
              <ShoppingBag size={19} aria-hidden="true" />
            )}
            Adicionar à sacola demo
          </>
        )}
      </button>
      <p className="added-message" role="status">
        {added
          ? `${quantity} ${quantity === 1 ? "unidade na sacola demonstrativa" : "unidades na sacola demonstrativa"}. Nenhuma compra realizada.`
          : "Você pode revisar os itens no ícone de sacola."}
      </p>
    </Modal>
  );
}
