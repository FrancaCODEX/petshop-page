export const services = [
  {
    name: "Banho e tosa",
    text: "Higiene, carinho e um cheirinho de felicidade.",
    image: "service-banho",
    tone: "mint",
  },
  {
    name: "Veterinário",
    text: "Consultas e acompanhamento em cada fase.",
    image: "service-veterinario",
    tone: "peach",
  },
  {
    name: "Farmácia pet",
    text: "Produtos para a saúde do seu companheiro.",
    image: "service-farmacia",
    tone: "yellow",
  },
  {
    name: "Hotelzinho",
    text: "Uma estadia com conforto e acolhimento.",
    image: "service-hotel",
    tone: "peach",
  },
  {
    name: "Creche pet",
    text: "Brincadeiras, companhia e socialização.",
    image: "service-creche",
    tone: "yellow",
  },
  {
    name: "Adoção",
    text: "Uma nova história começa com um encontro.",
    image: "service-adocao",
    tone: "mint",
  },
] as const;
export const products = [
  {
    id: "racao",
    name: "Ração Premium",
    detail: "Cães adultos · 10 kg",
    price: 219.9,
    category: "Alimentação",
    image: "product-racao",
    description:
      "A opção de alimentação para cães adultos apresentada na referência PetAmigo. A composição e a indicação devem ser confirmadas no rótulo antes de uma compra real.",
  },
  {
    id: "corda",
    name: "Corda dental",
    detail: "Brinquedo para cães",
    price: 29.9,
    category: "Brinquedos",
    image: "product-corda",
    description:
      "Corda colorida para momentos de brincadeira com seu cão. Escolha brinquedos adequados ao porte, supervisione o uso e retire se houver desgaste.",
  },
  {
    id: "caminha",
    name: "Caminha Confort",
    detail: "Tamanho M",
    price: 179.9,
    category: "Acessórios",
    image: "product-caminha",
    description:
      "Um cantinho acolhedor para as pausas do seu pet. Modelo e tamanho apresentados na referência; medidas e material precisam ser confirmados no catálogo comercial.",
  },
  {
    id: "shampoo",
    name: "Shampoo Natural",
    detail: "Pelos sensíveis",
    price: 49.9,
    category: "Higiene",
    image: "product-shampoo",
    description:
      "Produto de higiene apresentado na referência para pelos sensíveis. Consulte a composição, siga o rótulo e peça orientação veterinária se houver irritação na pele.",
  },
];
export type Product = (typeof products)[number];
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export const articles = [
  {
    id: "higiene",
    title: "Como manter a higiene do seu pet em dia?",
    category: "Higiene e bem-estar",
    image: "blog-hygiene",
    intro:
      "Pequenos cuidados fazem parte de uma rotina confortável para cães e gatos.",
    sections: [
      [
        "Uma rotina que respeita o seu pet",
        "A frequência do banho depende da espécie, da pele, da pelagem e dos hábitos. Converse com o veterinário e evite usar produtos de higiene humana no seu animal.",
      ],
      [
        "Escovação e atenção aos detalhes",
        "Escove com um acessório adequado à pelagem. Observe unhas, patas, olhos e ouvidos sem introduzir objetos ou aplicar soluções sem orientação.",
      ],
      [
        "Quando procurar ajuda",
        "Coceira persistente, mau cheiro, feridas ou mudanças na pele merecem avaliação veterinária. O banho não substitui uma consulta.",
      ],
    ],
  },
  {
    id: "alimentacao",
    title: "Alimentação ideal para cada fase da vida",
    category: "Alimentação",
    image: "service-creche",
    intro:
      "Filhotes, adultos e idosos têm necessidades diferentes. A escolha começa com orientação.",
    sections: [
      [
        "A fase da vida importa",
        "Escolha um alimento indicado para a espécie e fase do seu pet. Porte, condição de saúde e atividade também influenciam a escolha e a quantidade.",
      ],
      [
        "Mudanças pedem cuidado",
        "Faça mudanças de alimentação com orientação e de forma gradual. Mantenha água fresca disponível e acompanhe o apetite e o peso com o veterinário.",
      ],
      [
        "Evite receitas por conta própria",
        "Dietas caseiras precisam de planejamento profissional. Não ofereça alimentos sem verificar se são seguros para a espécie.",
      ],
    ],
  },
  {
    id: "veterinario",
    title: "Sinais de que seu pet precisa de um veterinário",
    category: "Saúde pet",
    image: "service-veterinario",
    intro:
      "Conhecer os hábitos do seu companheiro ajuda a perceber quando algo muda.",
    sections: [
      [
        "Observe o comportamento",
        "Alterações no apetite, na ingestão de água, na disposição ou nos hábitos de higiene merecem atenção. Registre quando começaram e procure orientação.",
      ],
      [
        "Há sinais que não podem esperar",
        "Dificuldade para respirar, convulsões, suspeita de intoxicação, trauma ou dificuldade para urinar exigem atendimento veterinário imediato.",
      ],
      [
        "Não medique sem orientação",
        "Medicamentos humanos e doses improvisadas podem ser perigosos. Este texto é educativo e não oferece diagnóstico ou tratamento.",
      ],
    ],
  },
  {
    id: "viagens",
    title: "Como preparar seu pet para viagens",
    category: "Vida com pets",
    image: "service-hotel",
    intro: "Planejar o trajeto e a estadia deixa a preparação mais tranquila.",
    sections: [
      [
        "Comece antes de sair",
        "Verifique as regras do destino e do transporte, a documentação exigida e as necessidades de saúde com o veterinário.",
      ],
      [
        "Conforto durante o caminho",
        "Use um dispositivo de transporte adequado e seguro. Leve água e itens familiares e planeje pausas compatíveis com a viagem e o animal.",
      ],
      [
        "Uma alternativa para a estadia",
        "Se o pet ficar em um hotelzinho, conheça as instalações e confirme os requisitos de saúde e a rotina antes de reservar.",
      ],
    ],
  },
];
export type Article = (typeof articles)[number];
