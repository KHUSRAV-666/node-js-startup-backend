const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации

const VariantType = sequelize.define(
  "VariantType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name cannot be empty" },
      },
      trim: true, // Для удаления лишних пробелов (реализуется валидацией)
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Type is required" },
        notEmpty: { msg: "Type cannot be empty" },
      },
      trim: true,
    },
  },
  {
    timestamps: true, // Автоматически добавляет поля createdAt и updatedAt
  }
);
module.exports = VariantType;

// const mongoose = require('mongoose');

// // Define the Variant schema
// const variantTypeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//         trim: true
//     },
//     type: {
//         type: String,
//         required: [true, 'Type is required'],
//         trim: true
//     }
// },{ timestamps: true });

// // Create the Variant model
// const VariantType = mongoose.model('VariantType', variantTypeSchema);

// module.exports = VariantType;
