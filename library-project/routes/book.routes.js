// CRUD de Book

const router = require('express').Router();

// modelo
const Book = require('../models/Book.model');

// Crud - Create - criar dados
router.post('/', async (req, res, next) => {
  const { title, description, author, rating } = req.body;
  // const title = req.body.title;
  // const description = req.body.description;
  // const author = req.body.author;
  // const rating = req.body.rating;
  try {
    if(!title) throw new Error('titulo é obrigatório');
    const newBookFromDB = await Book.create({ title, description, author, rating });
    res.status(201).json(`Criado livro ${newBookFromDB.title} no banco de dados.`);
  } catch (error) {
    next(error)
  }
})

// cRud - Read - ler dados
router.get('/', async (req, res, next) => {
  try {
    const booksFromDB = await Book.find();
    res.status(200).json(booksFromDB);
  } catch (error) {
    console.log('Erro ao pesquisar livros.', error);
    next(error)
  }
});

router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const bookFromDB = await Book.findById(bookId); // retorna um objeto
    // findOne({ _id: bookId }) -->> retorna um objeto
    // find({ _id: bookId }) -->> retorna um array
    res.status(200).json(bookFromDB);
  } catch (error) {
    console.log('Erro ao pesquisar livro.', error);
    next(error)
  }
})

module.exports = router;
