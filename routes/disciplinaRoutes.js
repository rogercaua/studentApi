const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController"); // Corrigido para disciplinaController

// Rota para criar uma nova disciplina
router.post("/", disciplinaController.createDisciplina);

// Rota para listar todas as disciplinas
router.get("/", disciplinaController.getAllDisciplinas);

// Rota para deletar disciplina por ID
router.delete("/:id", disciplinaController.deleteDisciplina);

// Rota para deletar disciplina por nome (query string)
router.delete("/", disciplinaController.deleteDisciplina);

// // Rota para atualizar uma disciplina por ID
// router.put("/:id", disciplinaController.updateDisciplina);

module.exports = router;
