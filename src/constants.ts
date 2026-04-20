/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const INITIAL_DELIVERY_ZONES = [
  { name: "Bairro Rodilandia", price: 12.00 },
  { name: "Bairro Rosa dos ventos", price: 12.00 },
  { name: "Bairro unig", price: 10.00 },
  { name: "Bairro comendador soares", price: 12.00 },
  { name: "Bairro Carlos Sampaio", price: 9.00 },
  { name: "Bairro Arruda negreiros", price: 9.00 },
  { name: "Bairro inconfidência", price: 9.00 },
  { name: "Bairro centro Austin", price: 9.00 },
  { name: "Bairro queimados", price: 13.00 },
  { name: "Bairro Marileia", price: 9.00 },
  { name: "Bairro Ouro preto", price: 12.00 },
  { name: "Bairro Valverde", price: 12.00 },
  { name: "Bairro Cabuçu", price: 13.00 },
  { name: "Bairro Nova era", price: 10.00 },
  { name: "Bairro Jardim palmares", price: 10.00 },
  { name: "Bairro Rancho novo", price: 12.00 },
  { name: "Bairro centro Nova Iguaçu", price: 10.00 },
  { name: "Bairro da luz", price: 10.00 },
  { name: "Bairro alvorada", price: 9.00 },
  { name: "Bairro Parque da biquinha", price: 9.00 },
  { name: "Bairro Galpão eletro móveis", price: 9.00 },
  { name: "Bairro marau", price: 9.00 },
  { name: "Bairro palhada", price: 11.00 }
];

export const INITIAL_PRODUCTS = [
  // --- COMBOS E BARCAS (Os mais pedidos) ---
  { name: "COMBO NO CORAÇÃO", description: "30 hot philadelphia, 12 uramaki salmão, 8 philadelphia roll, 8 joy salmão, 6 Sashimis salmão.", price: 165.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/23927733190173432_1" },
  { name: "BARCA METADE FRITO, METADE CRU + 16 JOY", description: "40 PHILADELPHIA ROLL + 40 HOTS PHILADELPHIA CROCANTES + 16 JOY COM ARROZ", price: 175.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6211668988917814_1" },
  { name: "Combo N:4", description: "5 joys, 5 sashimis, 5 sushis, 15 philadelphia roll, 12 haruhot sem arroz e 16 hots philadelphia crocantes.", price: 150.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/7510286045741195_1" },
  { name: "BARCA COM 2 TEMAKIS FRITOS", description: "45 hots salmão, 2 temakis hots salmão.", price: 145.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/24028489810124753_1" },
  { name: "BARQUINHA TODA FRITA", description: "15 hot philadelphia, 12 Haru hot sem arroz, 8 joy com camarão.", price: 109.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6287438758005482_1" },
  { name: "COMBO CRU", description: "8 joy camarão, 8 joy cebolinha, 1 temaki philadelphia salmão, 7 sashimis salmão.", price: 115.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/4822467617877094_1" },
  { name: "Combo.2", description: "15 Hot Philadelphia, 15 Philadelphia roll, 5 Sashimis, 5 Sushi Niguiri", price: 90.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6533947276694848_1" },
  { name: "Combo para 1 Pessoa", description: "7 Hot salmão, 7 Philadelphia salmão, 4 hoy sem arroz, 4 niguiri salmão.", price: 67.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/30394064150208881_1" },
  
  // --- TEMAKIS ---
  { name: "TEMAKI SUPREMO", description: "Sem alga, somente salmão, pouco arroz, cream chesse e camarão.", price: 60.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6327061437371616_1" },
  { name: "Temaki De Salmão Sem Arroz", description: "Salmão fresco picado, cream cheese e cebolinha, enrolado na alga.", price: 45.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/27170767502569383_1" },
  { name: "Temaki Salmão e Camarão", description: "Combinação perfeita de salmão fresco e camarões selecionados.", price: 38.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8991621604251030_1" },
  { name: "Temaki hot salmão Unidade", description: "Alga, arroz, cream chesse, salmão, cebolinha, empanado e frito", price: 33.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6187290858060737_1" },
  { name: "Temaki philadelphia salmão", description: "Alga, Arroz, cream chesse, Salmão, cebolinha", price: 30.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6029225873856682_1" },
  { name: "Temaki Califórnia", description: "Alga, Arroz, cream chesse, kani, pepino, manga", price: 25.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9818898041469486_1" },
  { name: "Temaki skin Unidade", description: "Alga, Arroz, cream chesse, pele de salmão, cebolinha, frito", price: 24.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6062888320455215_1" },
  { name: "Temaki doce (banana com chocolate)", description: "Banana frita com cobertura de chocolate cremoso.", price: 37.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8129146863805594_1" },

  // --- YAKISOBAS ---
  { name: "yakisoba Salmão 600g", description: "Repolho verde, repolho roxo, cenoura, cebola e salmão fresco.", price: 44.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/26104759969145338_1" },
  { name: "YAKISOBA MISTO 850G", description: "Legumes, macarrão, carne, frango e camarão.", price: 69.90, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/24776506148700938_1" },
  { name: "YAKISOBA DE CALABRESA 600G", description: "200g legumes, 200g macarrão, 100g de calabresa acebolada.", price: 30.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6202504696497447_1" },
  { name: "Yakisoba Carne 600G", description: "Legumes selecionados, macarrão chinês e carne bovina macia.", price: 33.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8221979807880867_1" },
  { name: "YAKISOBA DE FRANGO 600G", description: "Legumes, macarrão e peito de frango em cubos.", price: 30.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6514304395257850_1" },
  { name: "YAKISOBA FRUTOS DO MAR 600G", description: "Legumes, macarrão, salmão, camarão, polvo e anéis de lula.", price: 47.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/26584569051188533_1" },

  // --- HOTS E FRIED ---
  { name: "HOT GOURMET", description: "80g de salmão, cream chesse, geleia de pimenta, gergelim e cebolinha.", price: 45.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8519884484698792_1" },
  { name: "Haru hot 12 Unidades", description: "Casquinha crocante, salmão, cream cresse, cebolinha (sem arroz).", price: 38.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6740552245974742_1" },
  { name: "30 HOTS PHILADELPHIA CROCANTES", description: "Hots tradicionais de salmão com empanamento super crocante.", price: 50.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6147684768646304_1" },
  { name: "Hot Salmão 7 Peças", description: "Alga, arroz, cream chesse, salmão fresco e cebolinha.", price: 18.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9706217972770461_1" },
  { name: "Hot Atum 15 unidades", description: "Alga, arroz, cream chesse, atum e cebolinha.", price: 25.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6452525184771838_1" },
  { name: "Hot Camarão 15 unidades", description: "Alga, arroz, cream chesse e camarões inteiros.", price: 29.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/5942636665862379_1" },
  { name: "Hot Kani", description: "Alga, arroz, cream chesse, kani e gergelim.", price: 25.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6328621930534917_1" },
  { name: "15 camarões empanados", description: "Camarões grandes empanados na farinha panko.", price: 50.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8153490414764213_1" },

  // --- ROLLS (PHILA E URAMAKI) ---
  { name: "Philadelphia Camarão", description: "Alga, Arroz japonês, cream chesse, camarão e cebolinha.", price: 27.90, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9210028115772865_1" },
  { name: "Philadelphia Skin", description: "Alga, Arroz japonês, cream chesse, pele de salmão frita e cebolinha.", price: 27.50, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9696403423755340_1" },
  { name: "Philadelphia roll 15 Unidades", description: "Tradicional: Alga, arroz, salmão, cream chesse e cebolinha.", price: 27.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6084355291632961_1" },
  { name: "Uramaki Califórnia 12 peças", description: "Manga, pepino e kani envoltos em arroz e semente de gergelim.", price: 26.90, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6071939049560534_1" },
  { name: "Uramaki Skin 12 peças", description: "Arroz por fora com recheio de pele de salmão grelhada e cream cheese.", price: 26.90, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6099826200131054_1" },
  { name: "EBITEN URAMAKI 12 PEÇAS", description: "Arroz, camarão empanado, cream chesse e cebolinha.", price: 29.90, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6027367477392085_1" },
  { name: "Philadelphia Kani 15 Unidades", description: "Arroz, kani-kama fresco e cream cheese.", price: 27.50, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6590525697647624_1" },

  // --- SASHIMIS E NIGUIRIS ---
  { name: "Sashimi salmão 10 Peças", description: "Lâminas fresquíssimas de salmão selecionado.", price: 39.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6606827659329822_1" },
  { name: "SASHIMIS POLVO 10 UNIDADES", description: "Fatias de polvo macias e saborosas.", price: 38.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9679643405442760_1" },
  { name: "Rosa, 10 Lâminas Salmão", description: "Lâminas de salmão em formato de rosa decorativa.", price: 40.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8405933989502538_1" },
  { name: "Niguiri sushi salmão 8 peças", description: "Bolinha de arroz com filezinho de salmão por cima.", price: 30.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6000584016673782_1" },
  { name: "Niguiri sushi peixe branco 8 peças", description: "Bolinha de arroz com peixe branco do dia.", price: 30.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6124399904316641_1" },
  { name: "Niguiri sushi atum 8 peças", description: "Bolinha de arroz com atum fresco.", price: 30.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6736708826357393_1" },
  { name: "Niguiri sushi kani 8 peças", description: "Arroz moldado com kani-kama.", price: 30.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6305764492815051_1" },
  { name: "Niguiri skin 8 peças", description: "Arroz com pele de salmão grelhada e uma pitada de limão.", price: 27.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9776171569063255_1" },

  // --- JOYS ---
  { name: "Joy cebolinha 8 unidades", description: "Lâmina de salmão com cream chesse e cebolinha picada.", price: 36.99, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6060825670665467_1" },
  { name: "Joy camarão 8 unidades", description: "Lâmina de salmão com cream chesse e camarão em cima.", price: 38.99, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/5864245443686542_1" },
  { name: "Joy geleia de pimenta 8 unidades", description: "Salmão, cream cheese e geleia de pimenta artesanal.", price: 37.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6381703955194089_1" },
  { name: "Joy alho poró 8 unidades", description: "Salmão, cream cheese e alho poró crocante.", price: 37.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9969115539796018_1" },
  { name: "joy Doritos 4 Peças", description: "Lâmina de salmão, cream cheese e Doritos triturado.", price: 17.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9755608784484625_1" },

  // --- POKES E OUTROS ---
  { name: "Poke Completo", description: "Arroz japonês, camarão empanado, salmão, cream chesse, alho poró e pepino.", price: 70.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9509851629133834_1" },
  { name: "POKE 500GR", description: "Salmão em cubos, cream cheese, cebolinha e arroz japonês.", price: 88.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8372620372758594_1" },
  { name: "TARTA SALMÃO", description: "100g de Salmão fresco em cubos com cebolinha.", price: 35.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6587670157993002_1" },
  { name: "Sushi Burger", description: "Burger de arroz empanado com recheio generoso de salmão e cream cheese.", price: 60.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/26999042333043019_1" },
  { name: "Sunomono com salmão e camarão", description: "Salada de pepino agridoce com pedaços de salmão e camarão.", price: 35.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6911631168849598_1" },
  { name: "Salada Sunomono Simples", description: "Pepino japonês, molho su, kani e gergelim.", price: 19.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6294602657333957_1" },

  // --- HARUMAKIS (DOCES E SALGADOS) ---
  { name: "HARUMAKI DE CAMARÃO (3 UNIDADES)", description: "Massa crocante com recheio de camarão e cream cheese.", price: 28.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6185416621543393_1" },
  { name: "HARUMAKI ROMEU E JULIETA (3 UNIDADES)", description: "Goiabada com queijo derretido.", price: 27.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6387127891325791_1" },
  { name: "HARUMAKI DE CHOCOLATE PRETO (3 UNIDADES)", description: "Chocolate ao leite cremoso.", price: 28.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6357734787621785_1" },
  { name: "HARUMAKI CHOCOLATE BRANCO (3 UNIDADES)", description: "Chocolate branco premium.", price: 25.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/7119160951433481_1" },
  { name: "HARUMAKI DE BANANA COM CANELA (3 UNIDADES)", description: "Banana picada com açúcar e canela.", price: 25.90, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6207251309357725_1" },
  { name: "HARUMAKI DE QUEIJO (3 UNIDADES)", description: "Queijo mussarela derretido.", price: 27.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6159988890704907_1" },
  { name: "HARUMAKI DE LEGUMES (3 UNIDADES)", description: "Repolho, cenoura e temperos orientais.", price: 24.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/6219300134823401_1" },
  { name: "HARUMAKI DE FRANGO (3 UNIDADES)", description: "Frango desfiado com tempero especial.", price: 22.00, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/9236770399728980_1" },

  // Complementos (Marcados para aparecer apenas no carrinho)
  { name: "Geleia de pimenta 30 ml", price: 5.99, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8902007606587090_1", isComplemento: true, category: 'Complementos' },
  { name: "Shoyu, molho salgado", price: 0.99, image: "https://i.imgur.com/baAHPHI.jpeg", isComplemento: true, category: 'Complementos' },
  { name: "teriaki, molho doce, 30 ml", price: 3.99, image: "https://i.imgur.com/KAtHWRQ.jpeg", isComplemento: true, category: 'Complementos' },
  { name: "Biscoito da sorte", price: 2.99, image: "https://i.imgur.com/06r0oqd.jpeg", isComplemento: true, category: 'Complementos' },
  { name: "Wasabi e gengibre", price: 3.99, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/27667145612933477_1", isComplemento: true, category: 'Complementos' },
  { name: "Hashis ( Palitos de bambu)", price: 0.79, image: "https://i.imgur.com/6nwLp8q.jpeg", isComplemento: true, category: 'Complementos' },
];

export const COMPLEMENTOS = [
  { id: 'extra-1', name: "Geleia de pimenta 30 ml", price: 5.99, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/8902007606587090_1" },
  { id: 'extra-2', name: "Shoyu, molho salgado", price: 0.99, image: "https://i.imgur.com/baAHPHI.jpeg" },
  { id: 'extra-3', name: "teriaki, molho doce, 30 ml", price: 3.99, image: "https://i.imgur.com/KAtHWRQ.jpeg" },
  { id: 'extra-4', name: "Biscoito da sorte", price: 2.99, image: "https://i.imgur.com/06r0oqd.jpeg" },
  { id: 'extra-5', name: "Wasabi e gengibre", price: 3.99, image: "https://2chat-user-data.s3.amazonaws.com/w/p/5521992160657/27667145612933477_1" },
  { id: 'extra-6', name: "Hashis ( Palitos de bambu)", price: 0.79, image: "https://i.imgur.com/6nwLp8q.jpeg" }
];
