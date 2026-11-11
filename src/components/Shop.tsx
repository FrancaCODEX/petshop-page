import { useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { products, money } from "../data";
import type { Product } from "../data";
import { Photo } from "./UI";

export function Shop({
  onProduct,
  onCart,
}: {
  onProduct: (product: Product) => void;
  onCart: () => void;
}) {
  const [category, setCategory] = useState("Todos");
  const visible = products.filter(
    (product) => category === "Todos" || category === product.category,
  );
  return (
    <section
      className="section shop-section"
      id="loja"
      aria-labelledby="shop-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 id="shop-title">Favoritos para o seu favorito.</h2>
            <p>Uma seleção de cuidados, diversão e aconchego.</p>
          </div>
          <button className="text-link" onClick={onCart}>
            Ver minha sacola
            <ShoppingBag size={20} aria-hidden="true" />
          </button>
        </div>
        <div
          className="product-filters"
          role="group"
          aria-label="Filtrar produtos por categoria"
        >
          {["Todos", "Alimentação", "Brinquedos", "Acessórios", "Higiene"].map(
            (name) => (
              <button
                key={name}
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ),
          )}
        </div>
        <div className="products-grid" aria-live="polite">
          {visible.map((product) => (
            <button
              className="product-card"
              key={product.id}
              onClick={() => onProduct(product)}
            >
              <div className="product-image">
                <Photo name={product.image} alt="" width={280} height={250} />
                <span className="product-open">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.detail}</p>
                <strong>{money(product.price)}</strong>
                <span className="product-detail-link">
                  Ver detalhes
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
        <p className="shop-note">
          Loja demonstrativa · Produtos e valores da referência. Nenhuma compra
          ou cobrança é realizada.
        </p>
      </div>
    </section>
  );
}
