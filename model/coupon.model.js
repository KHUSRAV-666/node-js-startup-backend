const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации
const Category = require('./category.model'); // Импорт модели Category
const SubCategory = require('./subcategory.model'); // Импорт модели SubCategory
const Product = require('./product.model'); // Импорт модели Product

// Определение модели Coupon
const Coupon = sequelize.define('Coupon', {
  couponCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Уникальное значение
    validate: {
      notEmpty: { msg: 'Coupon code cannot be empty' },
    },
  },
  discountType: {
    type: DataTypes.ENUM('fixed', 'percentage'), // Ограниченные значения
    allowNull: false,
    validate: {
      isIn: {
        args: [['fixed', 'percentage']],
        msg: 'Discount type must be either "fixed" or "percentage"',
      },
    },
  },
  discountAmount: {
    type: DataTypes.FLOAT, // Тип данных для чисел с плавающей точкой
    allowNull: false,
    validate: {
      isFloat: { msg: 'Discount amount must be a valid number' },
      min: 0,
    },
  },
  minimumPurchaseAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Minimum purchase amount must be a valid number' },
      min: 0,
    },
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: 'End date must be a valid date' },
      isAfter: new Date().toISOString(), // Проверка, чтобы дата была позже текущей
    },
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active', // Значение по умолчанию
    validate: {
      isIn: {
        args: [['active', 'inactive']],
        msg: 'Status must be either "active" or "inactive"',
      },
    },
  },
  applicableCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, // Ссылка на таблицу Category
      key: 'id',
    },
  },
  applicableSubCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: SubCategory, // Ссылка на таблицу SubCategory
      key: 'id',
    },
  },
  applicableProductId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product, // Ссылка на таблицу Product
      key: 'id',
    },
  },
}, {
  timestamps: true, // Добавляет поля createdAt и updatedAt
});

module.exports = Coupon;

// const mongoose = require('mongoose');

// const couponSchema = new mongoose.Schema({
//   couponCode: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   discountType: {
//     type: String,
//     enum: ['fixed', 'percentage'],
//     required: true
//   },
//   discountAmount: {
//     type: Number,
//     required: true
//   },
//   minimumPurchaseAmount: {
//     type: Number,
//     required: true
//   },
//   endDate: {
//     type: Date,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['active', 'inactive'],
//     default: 'active'
//   },
//   applicableCategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category'
//   },
//   applicableSubCategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'SubCategory'
//   },
//   applicableProduct: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//   }
// }, { timestamps: true });

// const Coupon = mongoose.model('Coupon', couponSchema);

// module.exports = Coupon;
