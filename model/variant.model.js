const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации



  const Variant = sequelize.define(
    'Variant',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Variant name is required' },
          notEmpty: { msg: 'Variant name cannot be empty' },
        },
        trim: true, // Удаление лишних пробелов (эмулируется валидацией)
      },
      variantTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'VariantTypes', // Имя таблицы, к которой относится foreignKey
          key: 'id',
        },
        validate: {
          notNull: { msg: 'VariantTypeId is required' },
        },
      },
    },
    {
      timestamps: true, // Добавляет поля createdAt и updatedAt
    }
  );

  module.exports = Variant;


// const mongoose = require('mongoose');

// const variantSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     variantTypeId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'VariantType',
//         required: true
//     }
// },{ timestamps: true });

// module.exports = mongoose.model('Variant', variantSchema);
