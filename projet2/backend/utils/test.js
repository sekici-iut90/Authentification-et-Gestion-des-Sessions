const bcrypt = require('bcryptjs');

const runTest = async () => {
  const motDePasseEnClair = '147';
  console.log('Mot de passe en clair :', motDePasseEnClair);

  // Étape 1 : Hasher le mot de passe
  const hash = await bcrypt.hash(motDePasseEnClair, 10);
  console.log('Mot de passe hashé :', hash);

  // Étape 2 : Comparaison correcte
  const correspondance = await bcrypt.compare(motDePasseEnClair, hash);
  console.log('Correspondance correcte :', correspondance); // true attendu

  const cor = await bcrypt.compare(motDePasseEnClair, '$2b$10$pWSCPP4H8gxw.8CDGTq28ua6t5T5o195Ft3KhFDdVeQWPZ1o1dL9a')
  console.log('Correspondance test :', cor); // true attendu

  // Étape 3 : Comparaison incorrecte
  const mauvaisTest = await bcrypt.compare('mauvaismotdepasse', hash);
  console.log('Correspondance avec mauvais mot de passe :', mauvaisTest); // false attendu
};

runTest();
