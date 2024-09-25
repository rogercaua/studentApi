const mongoose = require('mongoose');

// Expressão regular para validação de e-mail
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Definindo o esquema para o modelo Aluno
const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garantindo que o email seja único
        validate: {
            validator: function(v) {
                return emailRegex.test(v); // Valida o formato do e-mail
            },
            message: props => `${props.value} não é um e-mail válido!`, // Mensagem de erro personalizada
        },
    },
    turma: {
        type: String,
        required: true,
    },
    disciplinas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disciplina', // Referenciando o modelo Disciplina
        },
    ],
}, {
    timestamps: true, // Para registrar a data de criação e atualização
});

// Exportando o modelo Aluno
module.exports = mongoose.model('aluno', alunoSchema);
