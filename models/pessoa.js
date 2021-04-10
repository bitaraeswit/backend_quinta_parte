const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  comentario: {
    type: String,
  },
});

module.exports = Pessoa = mongoose.model("pessoa", PessoaSchema);