const Disciplina = require('../models/DisciplinaModel');
// => PARA O CASO DE UTLIZAR A FUNCAO DE DELECAO DE DISCIPLINA DO ALUNO 
// const Aluno = require('../models/Aluno');
///
//
exports.getAllDisciplinas = async (req, res) => { 
    try {
        // Fazendo a busca por todas as disciplinas no banco de dados
        const allDisciplinas = await Disciplina.find();

        // Retornando a resposta ao cliente
        res.status(200).json({
            status: "success",
            results: allDisciplinas.length, // Contagem das disciplinas encontradas
            data: {
                disciplinas: allDisciplinas // Alterado para 'disciplinas' para maior clareza
            }
        });
    } catch (err) {
        // Retornando erro se algo der errado
        res.status(500).json({
            status: "fail",
            message: err.message // Exibe a mensagem de erro
        });
    }
};

 ///
///
// Adicionar uma nova disciplina
exports.createDisciplina = async (req, res) => {
    const { nome } = req.body; // Obtém o nome da disciplina do corpo da requisição

    try {
        // Verifica se a disciplina já existe
        const disciplinaExistente = await Disciplina.findOne({ nome });
        if (disciplinaExistente) {
            return res.status(400).json({ message: 'Disciplina já existe.' });
        }

        // Cria uma nova disciplina
        const novaDisciplina = new Disciplina({ nome });
        
        // Salva a nova disciplina no banco de dados
        const disciplinaSalva = await novaDisciplina.save();
        
        // Retorna a disciplina criada como resposta
        res.status(201).json({
            status: "success",
            message: "Disciplina criada com sucesso!",
            data: {
                disciplina: disciplinaSalva
            }
        });
    } catch (err) {
        res.status(400).json({ 
            status: "fail",
            message: err.message 
        });
    }
};
///
///
// Remover uma disciplina por ID ou nome
exports.deleteDisciplina = async (req, res) => {
    const { id } = req.params;  // Pegando 'id' da rota
    const { nome } = req.query;  // Pegando 'nome' da query string, se existir

    try {
        let disciplinaDeletada;

        // Se o 'id' for fornecido, deletar por ID
        if (id) {
            disciplinaDeletada = await Disciplina.findByIdAndDelete(id);

            if (!disciplinaDeletada) {
                return res.status(404).json({ message: 'Disciplina não encontrada pelo ID.' });
            }
        } 

        // Se o 'nome' for fornecido, deletar por nome
        else if (nome) {
            disciplinaDeletada = await Disciplina.findOneAndDelete({ nome });

            if (!disciplinaDeletada) {
                return res.status(404).json({ message: 'Disciplina não encontrada pelo nome.' });
            }
        } 
        // Se nenhum parâmetro for fornecido, retornar um erro
        else {
            return res.status(400).json({ message: 'Por favor, forneça um ID ou um nome para deletar.' });
        }

        res.status(200).json({ message: `Disciplina removida com sucesso` });

        // // VERIFICAR IMPLEMENTACAO
        // // Atualizar todos os alunos removendo a disciplina deletada 
        // await Aluno.updateMany(
        //     { "disciplinas.nome": disciplinaDeletada.nome },
        //     { $pull: { disciplinas: { nome: disciplinaDeletada.nome } } }
        // );

        // res.status(200).json({ message: `Disciplina removida com sucesso e alunos atualizados.` });
  
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};