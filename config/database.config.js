const { Pool } = require('pg');
const { Sequelize } = require('sequelize');

// Настройки подключения через Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // Или ваш удалённый хост
  database: 'node_js_startup',
  password: 'postgresql',
  port: 5432,
});

// Создаем экземпляр Sequelize
const sequelize = new Sequelize('node_js_startup', 'postgres', 'postgresql', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Отключение логов SQL-запросов
});

// Проверка подключения
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize подключен к базе данных через Pool.');

    // Создание таблиц (если они не существуют)
    await sequelize.sync({ alter: true }); // `alter` обновит структуру, если необходимо
    console.log('Таблицы синхронизированы с базой данных.');
    
  } catch (error) {
    console.error('Ошибка подключения Sequelize:', error);
  }
})();

module.exports = { sequelize, pool };
