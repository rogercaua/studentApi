const Aluno = require("../models/alunoModel");
const Disciplina = require('../models/DisciplinaModel'); // Importando o modelo de disciplina




// Método para obter todos os alunos com filtro de nome da disciplina e turma

// Método para obter todos os alunos com filtro de disciplina e turma
exports.getAllAlunos = async (req, res) => {
    const { disciplina, turma } = req.query; // Obtendo disciplina e turma da query string

    try {
        // Monta a consulta com base nos parâmetros fornecidos
        let filter = {};

        if (disciplina) {
            filter.disciplinas = disciplina; // Filtra por disciplina se fornecido
        }

        if (turma) {
            filter.turma = turma; // Filtra por turma se fornecido
        }

        const alunos = await Aluno.find(filter);
        res.status(200).json(alunos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
////  
//
// Método para criar um novo aluno// Método para criar um novo aluno
exports.createAluno = async (req, res) => {
    const { nome, email, turma } = req.body; // Extraindo dados de req.body

    // Verificando se os campos obrigatórios estão presentes
    if (!nome || !email || !turma) {
        return res.status(400).json({ message: 'Nome, email e turma são obrigatórios.' });
    }

    try {
        // Verificando se o email já existe
        const alunoExistente = await Aluno.findOne({ email });
        if (alunoExistente) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        // Obtendo todas as disciplinas existentes
        const disciplinasExistentes = await Disciplina.find();

        // Criando um novo aluno
        const novoAluno = new Aluno({
            nome,
            email,
            turma,
            disciplinas: disciplinasExistentes.map(disciplina => disciplina._id), // Associando todas as disciplinas existentes
        });

        // Salvando o aluno no banco de dados
        const alunoSalvo = await novoAluno.save();
        res.status(201).json(alunoSalvo);
    } catch (err) {
        console.error(err); // Logando o erro no console para depuração
        res.status(500).json({ message: 'Erro ao cadastrar aluno. Tente novamente.' }); // Retornando um erro genérico
    }
};
////
//
// Método para atualizar um aluno por nome ou email
exports.updateAluno = async (req, res) => {
    const { nome, email } = req.query; // Pegando 'nome' ou 'email' da query string
    const updatedData = req.body; // Dados para atualizar

    try {
        let aluno;

        // Verificando se nome ou email foram fornecidos
        if (nome) {
            aluno = await Aluno.findOne({ nome });
        } else if (email) {
            aluno = await Aluno.findOne({ email });
        } else {
            return res.status(400).json({ message: 'Por favor, forneça um nome ou um email para buscar o aluno.' });
        }

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado.' });
        }

        // Atualizando os dados do aluno
        Object.assign(aluno, updatedData);
        const alunoAtualizado = await aluno.save();

        res.status(200).json(alunoAtualizado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
////
//
// Método para atualizar a nota de um aluno
exports.updateNotaAluno = async (req, res) => {
    const { nome, email } = req.query; // Obter nome ou email da query string
    const { disciplinaNome, unidade, nota } = req.body; // Dados da nota

    try {
        let aluno;

        // Verificando se nome ou email foram fornecidos
        if (nome) {
            aluno = await Aluno.findOne({ nome });
        } else if (email) {
            aluno = await Aluno.findOne({ email });
        } else {
            return res.status(400).json({ message: 'Por favor, forneça um nome ou um email para buscar o aluno.' });
        }

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado.' });
        }

        // Encontrar a disciplina correspondente
        const disciplina = aluno.disciplinas.find(d => d.nome === disciplinaNome);
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada.' });
        }

        // Atualizar a nota com base na unidade
        if (unidade === 1) {
            disciplina.unidade1 = nota;
        } else if (unidade === 2) {
            disciplina.unidade2 = nota;
        } else if (unidade === 'recuperacao') {
            disciplina.recuperacao = nota;
        } else {
            return res.status(400).json({ message: 'Unidade inválida. Use 1, 2 ou "recuperacao".' });
        }

        await aluno.save(); // Salvar as alterações
        res.status(200).json({ message: 'Nota atualizada com sucesso.', aluno });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Método para obter todas as turmas dos alunos
exports.getAllTurmasFromAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find().select('turma'); // Busca apenas o campo 'turma'
        const turmas = [...new Set(alunos.map(aluno => aluno.turma))]; // Remove duplicatas
        res.status(200).json(turmas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
