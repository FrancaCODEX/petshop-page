"use client";
import { useRef, useState } from "react";
export function PetFamilyHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="pfd-header">
      <div className="pfd-container pfd-header-row">
        <a
          href="#pfd-inicio"
          className="pfd-brand"
          aria-label={`${name}, início`}
        >
          <span className="pfd-monogram" aria-hidden="true">
            pf<span>✦</span>
          </span>
          <span>
            {name}
            <small>CLÍNICA & CUIDADO</small>
          </span>
        </a>
        <button
          className="pfd-menu-toggle"
          ref={toggle}
          aria-controls="pfd-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {open ? "Fechar ×" : "Menu ☰"}
        </button>
        <nav
          id="pfd-navigation"
          className={open ? "pfd-navigation pfd-open" : "pfd-navigation"}
          aria-label="Navegação Pet’s Family"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {[
            ["Clínica", "pfd-clinica"],
            ["Banho e tosa", "pfd-banho"],
            ["Entrega", "pfd-entrega"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="pfd-button pfd-button-small"
            href="#pfd-contato"
            onClick={() => setOpen(false)}
          >
            Ver contatos <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
