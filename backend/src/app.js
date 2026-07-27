const express = require('express');
const cors = require('cors');
const formsRouter = require('./routes/forms');
const todosRouter = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/forms', formsRouter);
app.use('/todos', todosRouter);

app.use(errorHandler);
module.exports = app;
