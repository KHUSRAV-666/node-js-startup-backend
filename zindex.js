const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/database.config');

const app = express();
const port = 3000;

// Маршрут для теста подключения
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Успешное подключение! Текущее время: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Ошибка выполнения запроса:', err.stack);
    res.status(500).send('Ошибка подключения к базе данных');
  }
});

app.use(bodyParser.json()); // Для обработки JSON-запросов

// Проверка и создание таблицы пользователей
const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INTEGER
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Таблица users проверена или создана.');
  } catch (err) {
    console.error('Ошибка при создании таблицы:', err.stack);
  }
};

// Вызов проверки при запуске
createTableIfNotExists();

// POST маршрут для добавления пользователя
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).send('Имя и email обязательны!');
  }

  try {
    const insertUserQuery = `
      INSERT INTO users (name, email, age)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(insertUserQuery, [name, email, age]);
    res.status(201).send({
      message: 'Пользователь успешно создан',
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Ошибка при добавлении пользователя:', err.stack);
    if (err.code === '23505') {
      res.status(400).send('Пользователь с таким email уже существует');
    } else {
      res.status(500).send('Ошибка сервера');
    }
  }
});

app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
