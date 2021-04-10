const express = require('express');
const router = express.Router();

//------------------Tratar a autenticação--------------------------

const Pessoa = require('../models/pessoa');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
  Pessoa.findOne({senha: req.body.senha})
  .then(doc_pessoa => {
    if(doc_pessoa){
      return res.status(400).json({emailerror: "Senha já registrada no sistema"});
    }else{
      const novo_doc_pessoa = Pessoa({
        name: req.body.name,
        email: req.body.email,
        senha: req.body.senha,
        comentario: req.body.comentario,
      });

    // criptografar a senha
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(novo_doc_pessoa.senha, salt, function(err, hash) {
        if (err) throw err;
        novo_doc_pessoa.senha = hash;
        novo_doc_pessoa
        .save()
        .then(p => res.json(p))
        .catch(err => console.log(err));
      });
    });      
    }
  })
  .catch(err => console.log(err));
});

router.get('/', (req, res) => res.json({status: 'Acesso pemitido'}));

router.get('*', (req, res) => {
  res.send('Link inválido: 404');
});


module.exports = router;