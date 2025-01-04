const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации

const Notification = sequelize.define(
  "Notification",
  {
    notificationId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Notification ID is required" },
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Поле не является обязательным
      validate: {
        isUrl: { msg: 'Image URL must be a valid URL' }, // Проверка, что это валидный URL
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Notification;

// const mongoose = require('mongoose');

// // Define the Notification schema
// const notificationSchema = new mongoose.Schema({
//     notificationId: {
//         type: String,
//         required: [true, 'Notification ID is required'],
//         unique: true
//     },
//     title: {
//         type: String,
//         required: [true, 'Title is required'],
//         trim: true
//     },
//     description: {
//         type: String,
//         required: [true, 'Description is required'],
//         trim: true
//     },
//     imageUrl: {
//         type: String,
//         trim: true
//     },
// }, { timestamps: true });

// // Create the Notification model
// const Notification = mongoose.model('Notification', notificationSchema);

// module.exports = Notification;
