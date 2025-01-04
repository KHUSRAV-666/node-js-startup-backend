const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации

const Poster = sequelize.define(
  "Category",
  {
    posterName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Poster;

// const mongoose = require('mongoose');

// const posterSchema = new mongoose.Schema({
//   posterName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   imageUrl: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// const Poster = mongoose.model('Poster', posterSchema);

// module.exports = Poster;
