const pool = require('../../db');

exports.getAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM todo ORDER BY todo_id');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { description } = req.body;
    const result = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
      description,
      id,
    ]);
    res.json({ message: 'Todo updated' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
