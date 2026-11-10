export type Offering = { title: string; description: string; icon: string; provisional: boolean };
export type Review = { name: string; quote: string; sourceUrl: string; approved: boolean };
// Edite aqui os dados aprovados. Campos vazios não geram contatos fictícios.
export const business = {
  demo: true,
  name: 'Bicho & Afeto',
  tagline: 'pet shop • marca demonstrativa',
  description: 'Um espaço para estar perto, tirar dúvidas e cuidar de quem faz parte da família.',
  hero: { title: 'Amor de sobra.', accent: 'Cuidado também.', text: 'Para os dias de banho, as novas descobertas e todos os momentos entre um carinho e outro.' },
  address: '', hours: [] as string[], phone: '',
  whatsapp: { number: '', url: '', message: 'Olá! Quero saber mais sobre o pet shop.' },
  socials: [] as { label: string; url: string }[],
  images: {
    hero: { src: '/images/dog.webp', alt: 'Cachorro de pelagem dourada ao ar livre', provisional: true },
    about: { src: '/images/cat.webp', alt: 'Gato de olhos verdes olhando para a câmera', provisional: true },
  },
  services: [
    { title: 'Banho', description: 'Um momento de cuidado na rotina do seu companheiro. Consulte disponibilidade e detalhes.', icon: 'bath', provisional: true },
    { title: 'Tosa', description: 'Converse sobre o tipo de tosa e as necessidades do seu pet antes de agendar.', icon: 'scissors', provisional: true },
  ] as Offering[],
  products: { enabled: true, intro: 'Pequenas escolhas para acompanhar a vida com seu pet.', categories: [
    { title: 'Alimentação', description: 'Espaço para apresentar as opções da loja.', icon: 'bowl', provisional: true },
    { title: 'Brinquedos', description: 'Espaço para os favoritos da hora de brincar.', icon: 'ball', provisional: true },
    { title: 'Acessórios', description: 'Espaço para os detalhes do dia a dia.', icon: 'collar', provisional: true },
  ] as Offering[] },
  about: { title: 'Eles são família. E isso diz tudo.', text: 'A gente acredita que a vida com um pet é feita de pequenos momentos: um passeio sem pressa, uma brincadeira inesperada, um carinho no fim do dia.', note: 'Apresentação provisória. Substitua pela história e pelos valores aprovados do pet shop.' },
  reviews: [] as Review[],
};
export function whatsappUrl() {
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(business.whatsapp.url)) return business.whatsapp.url;
  const number = business.whatsapp.number.replace(/\D/g, '');
  return /^\d{10,15}$/.test(number) ? `https://wa.me/${number}?text=${encodeURIComponent(business.whatsapp.message)}` : null;
}
export function mapsUrl() {
  return business.address.trim() ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}` : null;
}
