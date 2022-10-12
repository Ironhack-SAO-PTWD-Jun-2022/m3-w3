// pacotes
require('dotenv/config');
const mongoose = require('mongoose');

// modelos
const Book = require('../models/Book.model');

// dados
const data = require('./books-data.json');

// configuração do banco
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/libraryDB';

const connectDB = async () => {
  console.log('Tentando conectar ao banco de dados...');
  try {
    const x = await mongoose.connect(MONGO_URI);
    console.log(`Conectado ao banco de dados: ${x.connections[0].name}`);
  } catch (error) {
    console.error('Erro ao conectar banco de dados!', error);
  }
};

const createBooksInDB = async () => {
  console.log('Inserindo informações no banco de dados...');
  try {
    const booksFromDB = await Book.create(data);
    console.log(`Foram inseridos ${booksFromDB.length} livros no banco de dados.`)
  } catch (error) {
    console.error('Erro ao inserir livros no banco de dados', error);
  }
};

const seed = async () => {
  try {
    await connectDB();
    await Book.collection.drop();
    await createBooksInDB();
    mongoose.connection.close();
    console.log('Encerrada conexão.')
  } catch (error) {
    console.error('Erro ao executar o script.', error)
  }
};

seed();
// connectDB();
// mongoose.connection.close();