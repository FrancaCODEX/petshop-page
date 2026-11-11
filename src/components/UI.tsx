import { useEffect, useId, useRef } from "react";
import type { ReactNode, ImgHTMLAttributes } from "react";
import { ArrowUpRight, X } from "lucide-react";

export function Photo({
  name,
  alt,
  eager = false,
  ...props
}: {
  name: string;
  alt: string;
  eager?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={`/assets/${name}.webp`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      data-source="client"
      data-subject={alt}
      {...props}
    />
  );
}
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="#inicio">
      <Photo name="logo-v2" alt="" width={63} height={44} eager />
      <span>
        Pet<span>Amigo</span>
        <small>PET SHOP</small>
      </span>
    </a>
  );
}
export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="text-link" href={href}>
      {children}
      <ArrowUpRight size={20} aria-hidden="true" />
    </a>
  );
}
export function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <p className="demo-note">
      {children ||
        "Demonstração: nenhum dado é enviado e nenhum agendamento é realizado."}
    </p>
  );
}
export function Modal({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
        ),
      ).filter((item) => item.getClientRects().length > 0);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) {
        event.preventDefault();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !items.includes(document.activeElement as HTMLElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", trapFocus);
    return () => {
      dialog.removeEventListener("keydown", trapFocus);
      dialog.close();
      document.body.style.overflow = old;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal${wide ? " modal-wide" : ""}`}
      aria-labelledby={id}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <div className="modal-heading">
          <h2 id={id} tabIndex={-1} autoFocus>
            {title}
          </h2>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Fechar janela"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
