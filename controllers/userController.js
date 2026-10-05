let users = [
  { id: 1, name: 'Aya',    email: 'aya@gmail.com' },
  { id: 2, name: 'farah',  email: 'farah@gmail.com' },
  { id: 3, name: 'chaima', email: 'chaima@gmail.com' }
];
let prochainUserId = 4;

const getAllUsers = (req, res) => {
  const { name } = req.query;
  let resultat = users;
  if (name) {
    resultat = users.filter(u => u.name === name);
  }
  res.status(200).json({ total: resultat.length, users: resultat });
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Le nom et l'email sont obligatoires" });
  }
  const nouvelUtilisateur = { id: prochainUserId++, name, email };
  users.push(nouvelUtilisateur);
  res.status(201).json({ message: 'Utilisateur créé', user: nouvelUtilisateur });
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  if (!name || !email) {
    return res.status(400).json({ error: "Le nom et l'email sont obligatoires pour un PUT" });
  }

  users[index] = { id, name, email };
  res.status(200).json({ message: 'Utilisateur remplacé', user: users[index] });
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  const deleted = users.splice(index, 1)[0];
  res.status(200).json({ message: 'Utilisateur supprimé', user: deleted });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};