const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const validateAluno = require("../middleware/alunoValidator");

// Rota para criar um novo aluno
router.post('/', validateAluno, alunoController.createAluno);

// Rota para listar todos os alunos com filtro de disciplina e turma
router.get("/", alunoController.getAllAlunos);

// // Rota para obter um aluno por ID
// router.get("/:id", alunoController.getAlunoById);

// // Rota para atualizar um aluno por nome ou email
// router.put("/", alunoController.updateAluno);

// // Rota para deletar um aluno por ID
// router.delete("/:id", alunoController.deleteAluno);

// Rota para atualizar a nota de um aluno
router.put("/:id/nota", alunoController.updateNotaAluno);

// Rota para obter todas as turmas dos alunos
router.get("/turmas", alunoController.getAllTurmasFromAlunos);

module.exports = router;
