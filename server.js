const express = require('express');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());   // reads JSON body into req.body

// Mount router under /api/articles
app.use('/api/articles', articleRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: "API du Blog - Serveur Modulaire Opérationnel (SoC)" });
});

app.listen(PORT, () => {
  console.log(`Serveur modulaire en écoute sur http://localhost:${PORT}`);
});