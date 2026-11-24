let articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];

let prochainId = 4;


const getAllArticles = (req, res) => {
  const { author } = req.query; // = const author = req.query.author;
  let resultat = articles;

  if (author) { // si le client a précisé ?author=...
    resultat = articles.filter(a => a.author === author);const Article = require ('../ models / articleModel ') ;
// POST / api/ articles ( Creation protegee )




const createArticle = async (req , res) => {
try {
const { title , content } = req.body ;
if (! title || ! content ) {
return res. status (400).json ({ message : 'Titre et contenu obligatoires ' }) ;
}
// L'auteur est extrait du token verifie : usurpation impossible !
const newArticle = await Article . create ({
title ,
content ,
author : req. user._id
}) ;
const populated = await newArticle . populate ('author ', 'name email role ') ;
res. status (201).json ( populated ) ;
} catch ( err) {
res. status (500).json ({ message : err. message }) ;
}
};
// PUT / api/ articles /: id ( Modification protegee : auteur ou admin )
const updateArticle = async (req , res) => {
try {
const article = await Article.findById (req.params .id) ;
if (! article ) {
return res.status (404).json ({ message : 'Article non trouve ' }) ;
}
// Verification des droits de propriete
if ( article.author . toString () !== req.user ._id. toString () && req.user.role !== 'admin '
) {
return res. status (403) . json ({
message : 'Action interdite : vous n\ etes pas l\  auteur de cet article '
}) ;
}
article.title = req.body.title || article.title ;
article.content = req. body . content || article . content ;
const updated = await article . save () ;
const populated = await updated . populate ('author ', 'name email role ') ;
res. status (200) . json ( populated ) ;
} catch ( err) {
if (err. name === 'CastError ') {
return res. status (400) . json ({ message : 'Identifiant invalide ' }) ;
}
res. status (500) . json ({ message : err. message }) ;
}
};
// DELETE / api/ articles /: id ( Suppression protegee : auteur ou admin )
const deleteArticle = async (req , res) => {
try {
const article = await Article . findById (req.params.id) ;
if (! article ) {
return res. status (404) . json ({ message : 'Article non trouve ' }) ;
}
if ( article.author.toString () !== req.user._id. toString () && req.user.role !== 'admin '
) {
return res. status (403) . json ({ message : 'Action interdite : vous n\ etes pas l\ auteur de cet article '}) ;
}


await Article . findByIdAndDelete ( req. params .id) ;
res. status (200) . json ({ message : 'Article supprime avec succes ', id: req. params .id }) ;
} catch ( err) {
if (err. name === 'CastError ') {
return res. status (400) . json ({ message : 'Identifiant invalide ' }) ;
}
res. status (500) . json ({ message : err. message }) ;
}
};
  }

  res.json({ total: resultat.length, articles: resultat });
}

const getArticleById = (req, res) => {
  const id = Number(req.params.id); // "2" -> 2
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  res.json(article);
}


const createArticle = (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) { // validation : les deux champs sont obligatoires
    return res.status(400).json({ error: "Le titre et l'auteur sont obligatoires" });
  }

  const nouvelArticle = { id: prochainId, title: title, author: author };
  prochainId = prochainId + 1;

  articles.push(nouvelArticle);

  res.status(201).json({ message: 'Article créé', article: nouvelArticle });
}

const updateArticle = (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body; //destructuration

  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  if (title) {
    articles[index].title = title;
  }
  if (author) {
    articles[index].author = author;
  }

  res.status(200).json({ message: 'Article ${id} mis à jour', article: articles[index] });

}

const deleteArticle = (req, res) => {
  const id = Number(req.params.id);
  const articleExiste = articles.some(a => a.id === id);

  if (!articleExiste) {
    return res.status(404).json({ error: 'Impossible de supprimer : article ${id} introuvable' });
  }

  articles = articles.filter(a => a.id !== id);

  res.status(200).json({ message: 'Article ${id} supprimé avec succès' });

}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
}
