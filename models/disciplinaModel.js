const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  unidade1: { type: Number, default: null },
  unidade2: { type: Number, default: null },
  recuperacao: { type: Number, default: null },
  mediaFinal: { type: Number, default: null }
});

module.exports = mongoose.model('disciplina', disciplinaSchema);
