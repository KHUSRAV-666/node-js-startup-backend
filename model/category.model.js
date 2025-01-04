const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Category;

// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     image: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Category', categorySchema);
