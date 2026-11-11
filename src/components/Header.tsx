import { useEffect, useRef, useState } from "react";
import { CalendarDays, Menu, ShoppingBag, X } from "lucide-react";
import { Brand } from "./UI";

export function Header({
  count,
  onCart,
  onBook,
}: {
  count: number;
  onCart: () => void;
  onBook: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const links = [
    ["Serviços", "servicos"],
    ["Loja", "loja"],
    ["Clube", "clube"],
    ["Adoção", "adocao"],
    ["Dicas", "blog"],
    ["Contato", "contato"],
  ];
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    const resize = () => {
      if (window.innerWidth >= 1100) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map(([name, id]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button bag-button"
              onClick={onCart}
              aria-label={`Abrir sacola de demonstração, ${count} produtos`}
            >
              <ShoppingBag size={22} aria-hidden="true" />
              {count > 0 && <span className="bag-count">{count}</span>}
            </button>
            <button className="button header-book" onClick={onBook}>
              <CalendarDays size={18} aria-hidden="true" />
              <span>Agendar serviço</span>
            </button>
            <button
              ref={buttonRef}
              className="icon-button menu-toggle"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div
          id="menu-mobile"
          className="mobile-menu"
          ref={menuRef}
          hidden={!open}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              !buttonRef.current?.contains(event.relatedTarget)
            )
              setOpen(false);
          }}
        >
          <nav className="container" aria-label="Navegação mobile">
            {links.map(([name, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {name}
              </a>
            ))}
            <button
              className="button"
              onClick={() => {
                setOpen(false);
                onBook();
              }}
            >
              Agendar serviço
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
