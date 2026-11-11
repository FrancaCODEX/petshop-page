import { ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "../data";
import type { Article } from "../data";
import { Photo } from "./UI";

export function Blog({ onRead }: { onRead: (article: Article) => void }) {
  return (
    <section
      className="section blog-section"
      id="blog"
      aria-labelledby="blog-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <h2 id="blog-title">Cuidar também é aprender.</h2>
            <p>Dicas para uma rotina com mais bem-estar.</p>
          </div>
          <BookOpen
            className="section-icon"
            size={34}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <div className="blog-grid">
          <button
            className="featured-article"
            onClick={() => onRead(articles[0])}
          >
            <div className="featured-image">
              <Photo
                name={articles[0].image}
                alt="Golden retriever deitado na grama com uma toalha após o banho"
                width={800}
                height={400}
              />
            </div>
            <div className="featured-copy">
              <span>{articles[0].category}</span>
              <h3>{articles[0].title}</h3>
              <span className="text-link">
                Ler artigo
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </div>
          </button>
          <div className="article-list">
            {articles.slice(1).map((article) => (
              <button
                className="article-row"
                key={article.id}
                onClick={() => onRead(article)}
              >
                <div className="article-thumb">
                  <Photo name={article.image} alt="" width={120} height={110} />
                </div>
                <div>
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                </div>
                <ArrowUpRight size={21} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
