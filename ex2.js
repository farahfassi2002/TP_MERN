const produits = [
  { nom: 'Clavier', prix: 45 },
  { nom: 'Écran', prix: 320 },
  { nom: 'Souris', prix: 25 }
];

// 1. Destructuring
const { nom, prix } = produits[0];
console.log(nom, prix);          // Clavier 45

// 2. find
const souris = produits.find(p => p.nom === 'Souris');
console.log(souris.prix);        // 25

// 3. filter
const pasCher = produits.filter(p => p.prix < 100);
console.log(pasCher);

// 4. Arrow function with discount
const avecRemise = (p) => p * 0.9;
console.log(avecRemise(320));    // 288