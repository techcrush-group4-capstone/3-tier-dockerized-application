const { validationResult } = require('express-validator');
let forms = [];
let nextId = 1;

exports.getAll = (req, res) => res.json(forms);

exports.getOne = (req, res) => {
  const form = forms.find(f => f.id === Number(req.params.id));
  if (!form) return res.status(404).json({ error: 'Form not found' });
  res.json(form);
};

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const form = { id: nextId++, title: req.body.title, fields: req.body.fields, createdAt: new Date() };
  forms.push(form);
  res.status(201).json(form);
};

exports.update = (req, res) => {
  const form = forms.find(f => f.id === Number(req.params.id));
  if (!form) return res.status(404).json({ error: 'Form not found' });
  Object.assign(form, req.body);
  res.json(form);
};

exports.remove = (req, res) => {
  const exists = forms.find(f => f.id === Number(req.params.id));
  if (!exists) return res.status(404).json({ error: 'Form not found' });
  forms = forms.filter(f => f.id !== Number(req.params.id));
  res.status(204).send();
};