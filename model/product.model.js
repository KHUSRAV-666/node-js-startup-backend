const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.config'); // Импорт sequelize
const Category = require("./category.model");
const SubCategory = require("./subcategory.model");
const Brand = require("./brand.model");

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    validate: {
      notNull: { msg: 'Name is required' },
      notEmpty: { msg: 'Name cannot be empty' },
    },
  },
  description: {
    type: DataTypes.STRING,
    trim: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'Quantity is required' },
      isInt: { msg: 'Quantity must be an integer' },
      min: 0,
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Price is required' },
      isFloat: { msg: 'Price must be a number' },
      min: 0,
    },
  },
  offerPrice: {
    type: DataTypes.FLOAT,
    validate: {
      isFloat: { msg: 'Offer price must be a number' },
      min: 0,
    },
  },
  proCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
    validate: {
      notNull: { msg: 'Category ID is required' },
    },
  },
  proSubCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SubCategory,
      key: 'id',
    },
    validate: {
      notNull: { msg: 'SubCategory ID is required' },
    },
  },
  proBrandId: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id',
    },
  },
  proVariantTypeId: {
    type: DataTypes.INTEGER,
  },
  proVariantId: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  images: {
    type: DataTypes.JSONB,
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Images must be an array');
        }
      },
    },
  },
}, {
  timestamps: true, // Добавляет createdAt и updatedAt
});

module.exports = Product;


// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//         trim: true
//     },
//     description: {
//         type: String,
//         trim: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     offerPrice: {
//         type: Number
//     },
//     proCategoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     proSubCategoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'SubCategory',
//         required: true
//     },
//     proBrandId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Brand'
//     },
//     proVariantTypeId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'VariantType'
//     },
//     proVariantId: [String],
//     images: [{
//         image: {
//             type: Number,
//             required: true
//         },
//         url: {
//             type: String,
//             required: true
//         }
//     }]
// }, { timestamps: true });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
