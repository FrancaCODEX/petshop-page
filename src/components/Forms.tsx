import { useId, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { DemoNote } from "./UI";
import { services } from "../data";

type Field = {
  name: string;
  label: string;
  type?: string;
  options?: string[];
  placeholder?: string;
  full?: boolean;
  min?: string;
  max?: string;
};
export function DemoForm({
  type,
  initialService = "Banho e tosa",
}: {
  type: "booking" | "adoption" | "contact";
  initialService?: string;
}) {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<Record<string, string> | null>(null);
  const localDate = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  };
  const maximum = new Date();
  maximum.setMonth(maximum.getMonth() + 6);
  const fields: Field[] = [
    {
      name: "name",
      label: "Seu nome",
      type: "text",
      placeholder: "Como podemos chamar você?",
    },
    {
      name: "email",
      label: "E-mail",
      type: "email",
      placeholder: "voce@exemplo.com",
    },
    ...(type === "booking"
      ? [
          {
            name: "pet",
            label: "Nome do pet",
            type: "text",
            placeholder: "O nome do seu melhor amigo",
          },
          {
            name: "service",
            label: "Serviço",
            options: services
              .filter((service) => service.name !== "Adoção")
              .map((service) => service.name),
          },
          {
            name: "date",
            label: "Data desejada",
            type: "date",
            min: localDate(),
            max: maximum.toISOString().slice(0, 10),
          },
          {
            name: "time",
            label: "Período desejado",
            options: ["Manhã", "Tarde"],
          },
        ]
      : []),
    ...(type === "adoption"
      ? [
          {
            name: "home",
            label: "Como seria a rotina da Luna com você?",
            type: "textarea",
            placeholder:
              "Conte sobre seu lar e os cuidados que pretende oferecer.",
            full: true,
          },
        ]
      : []),
    ...(type === "contact"
      ? [
          {
            name: "message",
            label: "Sua mensagem",
            type: "textarea",
            placeholder: "Conte como podemos ajudar.",
            full: true,
          },
        ]
      : []),
  ];
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([key, value]) => [
        key,
        String(value).trim(),
      ]),
    );
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = values[field.name] || "";
      if (!value)
        next[field.name] =
          `Preencha ${field.label.toLocaleLowerCase("pt-BR")}.`;
      else if (field.name === "name" && value.length < 2)
        next.name = "Informe seu nome com pelo menos 2 caracteres.";
      else if (
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        next.email = "Informe um e-mail válido, como voce@exemplo.com.";
      else if (field.type === "textarea" && value.length < 15)
        next[field.name] =
          "Escreva pelo menos 15 caracteres para detalhar sua mensagem.";
      else if (
        field.type === "date" &&
        (value < localDate() || value > (field.max || ""))
      )
        next.date = "Escolha uma data entre hoje e os próximos 6 meses.";
    }
    if (!values.consent)
      next.consent = "Marque a caixa para continuar com a demonstração.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setSummary(values);
  }
  if (summary)
    return (
      <div
        className="form-summary"
        role="status"
        tabIndex={-1}
        ref={(element) => element?.focus()}
      >
        <ClipboardCheck size={38} aria-hidden="true" />
        <h3>Veja como ficou sua simulação.</h3>
        <p>
          {type === "booking"
            ? "Nenhum horário foi reservado e nenhum dado foi enviado."
            : type === "adoption"
              ? "Seu interesse foi apenas simulado. Nenhuma solicitação de adoção foi enviada."
              : "Esta mensagem não foi enviada. Seus dados ficaram somente nesta janela."}
        </p>
        <dl>
          <div>
            <dt>Nome</dt>
            <dd>{summary.name}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{summary.email}</dd>
          </div>
          {type === "booking" && (
            <>
              <div>
                <dt>Pet e serviço</dt>
                <dd>
                  {summary.pet} · {summary.service}
                </dd>
              </div>
              <div>
                <dt>Preferência</dt>
                <dd>
                  {summary.date.split("-").reverse().join("/")} · {summary.time}
                </dd>
              </div>
            </>
          )}
          {summary.home && (
            <div>
              <dt>Sobre o lar</dt>
              <dd>{summary.home}</dd>
            </div>
          )}
          {summary.message && (
            <div>
              <dt>Mensagem</dt>
              <dd>{summary.message}</dd>
            </div>
          )}
        </dl>
        <button
          className="button button-outline"
          onClick={() => setSummary(null)}
        >
          Fazer outra simulação
        </button>
      </div>
    );
  return (
    <>
      <DemoNote>
        {type === "adoption"
          ? "Demonstração: o interesse na Luna não é enviado. A disponibilidade e o processo de adoção precisam ser confirmados."
          : type === "contact"
            ? "Demonstração: sua mensagem não será enviada. Não informe dados sensíveis."
            : undefined}
      </DemoNote>
      <form className="demo-form" noValidate onSubmit={submit}>
        <p className="form-required">Todos os campos são obrigatórios.</p>
        <div className="form-fields">
          {fields.map((field) => (
            <div
              className={`field${field.full ? " field-full" : ""}`}
              key={field.name}
            >
              <label htmlFor={`${id}-${field.name}`}>{field.label}</label>
              {field.options ? (
                <select
                  id={`${id}-${field.name}`}
                  name={field.name}
                  defaultValue={field.name === "service" ? initialService : ""}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? `${id}-${field.name}-error` : undefined
                  }
                  required
                >
                  {field.name !== "service" && (
                    <option value="">Selecione um período</option>
                  )}
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={`${id}-${field.name}`}
                  name={field.name}
                  rows={4}
                  maxLength={1500}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? `${id}-${field.name}-error` : undefined
                  }
                  required
                />
              ) : (
                <input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={
                    field.name === "name"
                      ? "name"
                      : field.name === "email"
                        ? "email"
                        : "off"
                  }
                  min={field.min}
                  max={field.max}
                  maxLength={
                    field.type === "text"
                      ? 100
                      : field.type === "email"
                        ? 254
                        : undefined
                  }
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? `${id}-${field.name}-error` : undefined
                  }
                  required
                />
              )}
              {errors[field.name] && (
                <p id={`${id}-${field.name}-error`} className="field-error">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="consent-field">
          <label>
            <input
              type="checkbox"
              name="consent"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={
                errors.consent ? `${id}-consent-error` : undefined
              }
              required
            />
            <span>
              Entendo que este é um formulário de demonstração e que meus dados
              não serão enviados.
            </span>
          </label>
          {errors.consent && (
            <p id={`${id}-consent-error`} className="field-error">
              {errors.consent}
            </p>
          )}
        </div>
        <button className="button form-submit" type="submit">
          {type === "booking"
            ? "Revisar simulação de agendamento"
            : type === "adoption"
              ? "Simular interesse na Luna"
              : "Revisar mensagem de demonstração"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </>
  );
}
