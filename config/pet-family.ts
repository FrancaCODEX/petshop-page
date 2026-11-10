/**
 * PET'S FAMILY — dados da demonstração em /pet-family
 * ------------------------------------------------------------------
 * Tudo o que a página mostra sai deste arquivo.
 * Origem dos dados: o que o perfil do Instagram @familypet1 informa.
 * Nada aqui foi confirmado pela equipe. Campo vazio = dado ainda não
 * fornecido; a página mostra "a confirmar" em vez de inventar.
 */
export const petFamily = {
  /**
   * true  = página de demonstração: faixa de aviso, marcações "a confirmar"
   *         e noindex. Só mude para false depois da aprovação da Pet's Family.
   */
  demo: true,

  name: "Pet’s Family",
  tagline: "Clínica veterinária · Banho e tosa · Entrega",

  instagram: {
    handle: "@familypet1",
    url: "https://www.instagram.com/familypet1/",
  },

  /**
   * WHATSAPP — CONFIRMAR COM A EQUIPE
   * Preencha `number` (somente dígitos, com DDI e DDD, ex.: "5511999999999")
   * ou `url` (link pronto, ex.: "https://wa.me/message/XXXX").
   * Vazio = o botão de WhatsApp aparece desativado, sem link.
   */
  whatsapp: {
    number: "",
    url: "",
    message: "Olá! Vim pelo site da Pet’s Family e gostaria de atendimento.",
  },

  /** TELEFONE — CONFIRMAR. Ex.: "(11) 99999-9999". Vazio = não aparece link de ligação. */
  phone: "",

  /** ENDEREÇO — CONFIRMAR. Endereço completo em uma linha. Vazio = sem link de rota. */
  address: "",

  /** Regiões citadas no perfil. */
  regions: ["Grajaú", "Apurá"],
  city: "São Paulo",

  clinic: {
    /**
     * ATENDIMENTO 24 HORAS — CONFIRMAR
     * O perfil informa "clínica veterinária 24 horas".
     * `confirmed: false` = a página atribui a informação ao perfil e avisa
     *                      que a equipe precisa confirmar.
     * `confirmed: true`  = a página afirma o atendimento 24 horas diretamente.
     */
    open24h: { informedByProfile: true, confirmed: false },
    text: "Atendimento veterinário para quem faz parte da família. Fale com a equipe para saber como funciona o atendimento e o que levar.",
  },

  grooming: {
    text: "Banho e tosa feitos com calma e atenção. Combine dia, horário e detalhes direto com a equipe.",
  },

  delivery: {
    text: "A Pet’s Family informa que faz entrega na região. Consulte a equipe para saber o que pode ser entregue e como pedir.",
    /** CONFIRMAR: itens exibidos como pendentes na seção de entrega. */
    pending: ["Bairros e ruas atendidos", "Taxa de entrega", "Horários", "Condições e pedido mínimo"],
  },

  about: {
    title: "Família cuida de família.",
    text: "A Pet’s Family reúne clínica veterinária, banho e tosa e entrega para quem mora no Grajaú, em Apurá e arredores.",
    /** A história da empresa não foi fornecida: este texto é provisório. */
    provisional: true,
  },

  /** Fotos provisórias já existentes no projeto (ver ASSETS.md). Não são da Pet's Family. */
  images: {
    hero: { src: "/images/dog.webp", alt: "Cachorro de pelagem dourada ao ar livre", illustrative: true },
    grooming: { src: "/images/cat.webp", alt: "Gato de olhos verdes olhando para a câmera", illustrative: true },
  },

  /** Lista exibida na seção de contato enquanto `demo` for true. */
  pending: [
    "Número de WhatsApp e telefone",
    "Endereço da clínica",
    "Atendimento 24 horas",
    "Regiões, taxas e horários da entrega",
    "Fotos autorizadas",
  ],
};

export function petFamilyWhatsappUrl(): string | null {
  const { url, number, message } = petFamily.whatsapp;
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(url)) return url;
  const digits = number.replace(/\D/g, "");
  return /^\d{10,15}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : null;
}

export function petFamilyPhoneUrl(): string | null {
  const digits = petFamily.phone.replace(/\D/g, "");
  return digits.length >= 10 ? `tel:+${digits.startsWith("55") ? digits : `55${digits}`}` : null;
}

export function petFamilyMapsUrl(): string | null {
  return petFamily.address.trim()
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(petFamily.address)}`
    : null;
}
