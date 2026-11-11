import { ArrowUpRight, Heart, PawPrint } from "lucide-react";
import { Photo } from "./UI";

export function Adoption({ onMeet }: { onMeet: () => void }) {
  return (
    <section
      className="adoption-section"
      id="adocao"
      aria-labelledby="adoption-title"
    >
      <div className="container adoption-layout">
        <div className="adoption-photo">
          <Photo
            name="adoption-luna"
            alt="Luna, gata tigrada, ao lado de uma almofada coral"
            width={700}
            height={560}
          />
          <div className="adoption-sticker">
            <Heart size={22} aria-hidden="true" />
            <span>
              Uma amiga
              <br />
              para a vida.
            </span>
          </div>
        </div>
        <div className="adoption-copy">
          <h2 id="adoption-title">
            Um novo lar.
            <br />
            Uma vida de amor.
          </h2>
          <p className="adoption-intro">Adoção da semana</p>
          <h3>
            Conheça a Luna <span aria-label="fêmea">♀</span>
          </h3>
          <div className="pet-traits">
            <span>2 anos</span>
            <span>Castrada</span>
            <span>Carinhosa</span>
          </div>
          <p>
            Dócil, carinhosa e pronta para um novo lar. Talvez o próximo
            capítulo da Luna seja ao seu lado.
          </p>
          <button className="button" onClick={onMeet}>
            Quero conhecer a Luna
            <ArrowUpRight size={19} aria-hidden="true" />
          </button>
          <p className="adoption-footnote">
            <PawPrint size={16} aria-hidden="true" />
            Adotar é um compromisso para a vida toda.
          </p>
        </div>
      </div>
    </section>
  );
}
