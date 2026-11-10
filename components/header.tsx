"use client";
import { useRef, useState } from "react";
import { business } from "@/config/business";
import { Icon } from "./icon";
export function Header({ contactUrl }: { contactUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = [
    ["Serviços", "servicos"],
    ...(business.products.enabled ? [["Produtos", "produtos"]] : []),
    ["Sobre", "sobre"],
    ["Localização", "localizacao"],
  ];
  return (
    <header className="header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label={`${business.name}, início`}
        >
          <span className="brand-mark">
            <Icon name="heart" />
          </span>
          <span>
            {business.name}
            <small>{business.tagline}</small>
          </span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fechar ×" : "Menu ☰"}
        </button>
        <nav
          id="navigation"
          aria-label="Principal"
          className={open ? "navigation is-open" : "navigation"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="button button-small"
            href={contactUrl ?? "#contato"}
            onClick={() => setOpen(false)}
          >
            <Icon name="chat" /> Vamos conversar
          </a>
        </nav>
      </div>
    </header>
  );
}
