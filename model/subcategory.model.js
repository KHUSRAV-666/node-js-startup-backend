const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации

// Определение модели SubCategory
const SubCategory = sequelize.define('SubCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required' },
        len: [1, 255], // Дополнительная валидация для длины имени
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories', // Имя таблицы, с которой будет связана данная модель
        key: 'id', // Ключ, который будет ссылаться на таблицу Category
      },
      validate: {
        notNull: { msg: 'Category ID is required' },
      },
    },
  }, {
    timestamps: true,
  });
  
  module.exports = SubCategory;

  
// const mongoose = require('mongoose');

// // Define the SubCategory schema
// const subCategorySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'], // Adding custom error message
//         trim: true
//     },
//     categoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category', // This should match the model name you use when you create the Category model
//         required: [true, 'Category ID is required']
//     }
// },{ timestamps: true });

// // Create the SubCategory model
// const SubCategory = mongoose.model('SubCategory', subCategorySchema);

// module.exports = SubCategory;

