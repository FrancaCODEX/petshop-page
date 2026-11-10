export const petFamily = {
  name: "Pet’s Family",
  demo: true,
  source:
    "Informações iniciais fornecidas a partir do perfil @familypet1. Ainda não confirmadas diretamente com a equipe.",
  hero: {
    title: "Cuidado para quem é da família.",
    description:
      "Clínica veterinária, banho e tosa e entrega na região do Grajaú e Apurá, em São Paulo — conforme as informações do perfil.",
  },
  clinic: {
    hours24Reported: true,
    hours24Confirmed: false,
    description:
      "Um espaço para conhecer a clínica veterinária e encontrar as informações de contato da equipe.",
  },
  grooming: {
    title: "Banho e tosa",
    description:
      "O cuidado do dia a dia também tem seu lugar. Banho e tosa é um dos serviços divulgados no perfil da Pet’s Family.",
    confirmed: false,
  },
  delivery: {
    regions: ["Grajaú", "Apurá"],
    city: "São Paulo",
    confirmed: false,
    conditions:
      "Cobertura exata, itens disponíveis para entrega, taxas, horários e condições precisam ser confirmados com a equipe.",
  },
  contact: {
    whatsapp: {
      number: "",
      confirmed: false,
      message: "Olá, Pet’s Family! Gostaria de mais informações.",
    },
    phone: { number: "", confirmed: false },
    address: { value: "", confirmed: false },
    // Preencha somente horários aprovados pela equipe.
    hours: [] as string[],
  },
  instagram: {
    handle: "@familypet1",
    url: "https://www.instagram.com/familypet1/",
    confirmed: false,
  },
  image: {
    src: "/images/pet-family/companions.svg",
    alt: "Ilustração original de um cachorro dourado ao lado de um gato, sentados juntos.",
    illustrative: true,
    approved: false,
  },
};

export function petFamilyWhatsAppUrl() {
  const contact = petFamily.contact.whatsapp;
  const digits = contact.number.replace(/\D/g, "");
  return contact.confirmed && /^\d{10,15}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(contact.message)}`
    : null;
}
export function petFamilyMapsUrl() {
  const address = petFamily.contact.address;
  return address.confirmed && address.value.trim()
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.value)}`
    : null;
}
export function petFamilyPhoneUrl() {
  const phone = petFamily.contact.phone;
  const digits = phone.number.replace(/[^+\d]/g, "");
  return phone.confirmed && /^\+?\d{10,15}$/.test(digits)
    ? `tel:${digits}`
    : null;
}
export function petFamilyInstagramUrl() {
  return petFamily.instagram.confirmed &&
    /^https:\/\/www\.instagram\.com\//.test(petFamily.instagram.url)
    ? petFamily.instagram.url
    : null;
}
