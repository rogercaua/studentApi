const Joi = require('joi');

// Define the schema for aluno
const alunoSchema = Joi.object({
    nome: Joi.string().min(3).required().messages({
        'string.empty': 'O nome é obrigatório.',
        'string.min': 'O nome deve ter pelo menos 3 caracteres.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'O email deve ser válido.',
        'string.empty': 'O email é obrigatório.'
    }),
    turma: Joi.string().required().messages({
        'string.empty': 'A turma é obrigatória.'
    }),
});

// Middleware para validar a requisição
const validateAluno = (req, res, next) => {
    const { error } = alunoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = validateAluno;
