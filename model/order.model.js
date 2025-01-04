const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.config"); // Импортируем sequelize из конфигурации
const User = require('./user.model'); // Импорт модели User
const Product = require('./product.model'); // Импорт модели Product
const Coupon = require('./coupon.model'); // Импорт модели Coupon

// Определение модели Order
const Order = sequelize.define('Order', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  orderStatus: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  shippingAddress: {
    type: DataTypes.JSON, // Используем JSON для сложных объектов
    allowNull: true,
  },
  paymentMethod: {
    type: DataTypes.ENUM('cod', 'prepaid'),
    allowNull: true,
  },
  couponCode: {
    type: DataTypes.INTEGER,
    references: {
      model: Coupon,
      key: 'id',
    },
  },
  orderTotal: {
    type: DataTypes.JSON, // JSON для сложных данных
    allowNull: true,
  },
  trackingUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'Tracking URL must be a valid URL' },
    },
  },
}, {
  timestamps: true, // Добавляет createdAt и updatedAt
});

// Определение таблицы OrderItem для связи "многие ко многим" между Order и Product
const OrderItem = sequelize.define('OrderItem', {
  orderID: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
    allowNull: false,
  },
  productID: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  variant: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false, // Для промежуточной таблицы можно отключить timestamps
});

module.exports = { Order, OrderItem };

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now
//   },
//   orderStatus: {
//     type: String,
//     enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//     default: 'pending'
//   },
//   items: [
//     {
//       productID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//       },
//       productName: {
//         type: String,
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true
//       },
//       price: {
//         type: Number,
//         required: true
//       },
//       variant: {
//         type: String,
//       },
//     }
//   ],
//   totalPrice: {
//     type: Number,
//     required: true
//   },
//   shippingAddress: {
//     phone: String,
//     street: String,
//     city: String,
//     state: String,
//     postalCode: String,
//     country: String
//   },

//   paymentMethod: {
//     type: String,
//     enum: ['cod', 'prepaid']
//   },

//   couponCode: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Coupon'
// },
//   orderTotal: {
//     subtotal: Number,
//     discount: Number,
//     total: Number
//   },
//   trackingUrl: {
//     type: String
//   },
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;
