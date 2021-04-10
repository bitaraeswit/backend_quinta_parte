const express = require("express");
const app = express();

//---------------------Banco de Dados-------------------------
const mongoose = require('mongoose');
const db_access = require('./setup/bd.js').mongoURL;

mongoose
  .connect(db_access, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Conexão ao MongoDB bem sucedida!"))
  .catch(err => console.log(err));

//---------------------------Login-----------------------------
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use('/contato', express.static(__dirname + '/public/contato'));

const auth = require('./routes/auth');

app.use("/auth", auth);

const port = 3000;

app.listen(port, () => console.log(`Executando na porta ${port}`));