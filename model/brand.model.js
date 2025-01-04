const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации
const SubCategory = require('./subcategory.model'); // Импорт модели SubCategory для связи

// Определение модели Brand
const Brand = sequelize.define('Brand', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Поле обязательно для заполнения
    validate: {
      notNull: { msg: 'Name is required' }, // Кастомное сообщение об ошибке
      notEmpty: { msg: 'Name cannot be empty' }, // Проверка на пустую строку
    },
    trim: true, // Аналог trim в Sequelize
  },
  subcategoryId: {
    type: DataTypes.INTEGER, // Предполагается, что ID будет числовым
    allowNull: false,
    references: {
      model: SubCategory, // Ссылка на модель SubCategory
      key: 'id', // Указываем поле первичного ключа
    },
    validate: {
      notNull: { msg: 'Subcategory ID is required' }, // Кастомное сообщение об ошибке
    },
  },
}, {
  timestamps: true, // Добавляет поля createdAt и updatedAt
});

module.exports = Brand;


// const mongoose = require('mongoose');

// // Define the Brand schema
// const brandSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'], // Adding custom error message
//         trim: true
//     },
//     subcategoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'SubCategory', // This should match the model name you use when you create the SubCategory model
//         required: [true, 'Subcategory ID is required']
//     }
// },{ timestamps: true });

// // Create the Brand model
// const Brand = mongoose.model('Brand', brandSchema);

// module.exports = Brand;
