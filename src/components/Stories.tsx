import { useState } from "react";
import { ArrowLeftRight, Heart, Quote } from "lucide-react";
import type { CSSProperties } from "react";
import { Photo } from "./UI";

// Inspired by Arc's ImageCompare, discovered through 21st.dev. A native range
// supplies keyboard, pointer and touch semantics without an animation dependency.
export function ImageCompare() {
  const [position, setPosition] = useState(50);
  return (
    <div
      className="compare"
      style={{ "--position": `${position}%` } as CSSProperties}
    >
      <Photo
        name="grooming-after"
        alt="Cão depois do banho e da tosa, com a pelagem limpa e aparada"
        width={600}
        height={550}
      />
      <div
        className="compare-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Photo
          name="grooming-before"
          alt="Cão antes do banho e da tosa, com a pelagem comprida"
          width={600}
          height={550}
        />
      </div>
      <span className="compare-label before-label" aria-hidden="true">
        Antes
      </span>
      <span className="compare-label after-label" aria-hidden="true">
        Depois
      </span>
      <div className="compare-divider" aria-hidden="true">
        <span>
          <ArrowLeftRight size={21} />
        </span>
      </div>
      <input
        id="grooming-comparison"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Comparar antes e depois do banho e tosa"
        aria-valuetext={`${position}% da foto antes do banho, ${100 - position}% da foto depois`}
      />
    </div>
  );
}
export function Stories({ onBook }: { onBook: () => void }) {
  return (
    <section
      className="section stories-section"
      aria-label="Transformação e depoimento"
    >
      <div className="container stories-grid">
        <div className="transformation">
          <div className="section-heading">
            <div>
              <h2>Um banho de carinho.</h2>
              <p>
                <label htmlFor="grooming-comparison">
                  Arraste para comparar antes e depois.
                </label>
              </p>
            </div>
          </div>
          <ImageCompare />
          <button className="text-link" onClick={onBook}>
            Agendar banho e tosa
            <ArrowLeftRight size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="testimonial">
          <Heart
            className="testimonial-heart"
            size={44}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2>Quem ama, recomenda.</h2>
          <Quote
            className="quote-icon"
            size={42}
            fill="currentColor"
            aria-hidden="true"
          />
          <blockquote>
            “Atendimento incrível! Meu cachorro sempre volta feliz do banho e
            tosa. Super recomendo!”
          </blockquote>
          <div className="review-author">
            <strong>Carla M.</strong>
            <span>Tutora do Thor</span>
          </div>
          <Photo
            name="testimonial-carla-dog"
            alt="Tutora abraçando seu golden retriever"
            width={420}
            height={400}
          />
          <span className="testimonial-source">
            Depoimento apresentado na referência.
          </span>
        </div>
      </div>
    </section>
  );
}
