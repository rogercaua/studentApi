const morgan = require("morgan");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const alunoRouter = require("./routes/alunoRoutes");
const disciplinasRouter = require("./routes/disciplinaRoutes.js")



//midlewares

app.use(bodyparser.json());
// Middleware para registrar requisições
app.use(cors());

if (process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
};
// Middleware para analisar o corpo da requisição
app.use(express.json());
app.use((req, res, next) => {

  console.log("express.json midleware");
  next();

});



app.use("/api/alunos", alunoRouter);
app.use("/api/disciplinas",disciplinasRouter)

module.exports = app;
