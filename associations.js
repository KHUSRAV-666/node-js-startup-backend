const Brand = require("./model/brand.model");
const Category = require("./model/category.model");
const Coupon = require("./model/coupon.model");
const { OrderItem, Order } = require("./model/order.model");
const Product = require("./model/product.model");
const SubCategory = require("./model/subcategory.model");
const Variant = require("./model/variant.model");
const VariantType = require("./model/varianttype.model");

module.exports = () => {
  // Определяем связь многие к одному: несколько SubCategory могут принадлежать одной Category
  SubCategory.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
  Category.hasMany(SubCategory, {
    foreignKey: "categoryId",
    as: "subcategories",
  });

  // Устанавливаем связи между моделями
  Product.belongsTo(Category, {
    foreignKey: "proCategoryId",
    as: "proCategory",
  });
  Category.hasMany(Product, { foreignKey: "proCategoryId", as: "products" });

  Product.belongsTo(SubCategory, {
    foreignKey: "proSubCategoryId",
    as: "proSubCategory",
  });
  SubCategory.hasMany(Product, {
    foreignKey: "proSubCategoryId",
    as: "products",
  });

  Product.belongsTo(Brand, { foreignKey: "proBrandId", as: "proBrand" });
  Brand.hasMany(Product, { foreignKey: "proBrandId", as: "products" });

  Product.belongsTo(VariantType, {
    as: "proVariantType",
    foreignKey: "variantTypeId",
  });
  VariantType.hasMany(Product, { as: "products", foreignKey: "variantTypeId" });

  Product.belongsTo(Variant, { as: "proVariant", foreignKey: "variantId" });
  Variant.hasMany(Product, { as: "products", foreignKey: "variantId" });

  // Устанавливаем связи между моделями
  SubCategory.hasMany(Brand, {
    foreignKey: "subcategoryId",
    onDelete: "CASCADE",
    as: "brands",
  });
  Brand.belongsTo(SubCategory, {
    foreignKey: "subcategoryId",
    as: "subcategory",
  });

  // // Устанавливаем связи "Многие к одному"
  Category.hasMany(Coupon, {
    foreignKey: "applicableCategoryId",
    as: "coupons",
  });
  Coupon.belongsTo(Category, {
    foreignKey: "applicableCategoryId",
    as: "applicableCategory",
  });

  SubCategory.hasMany(Coupon, {
    foreignKey: "applicableSubCategoryId",
    as: "coupons",
  });
  Coupon.belongsTo(SubCategory, {
    foreignKey: "applicableSubCategoryId",
    as: "applicableSubCategory",
  });

  Product.hasMany(Coupon, { foreignKey: "applicableProductId", as: "coupon" });
  Coupon.belongsTo(Product, {
    foreignKey: "applicableProductId",
    as: "applicableProduct",
  });

  // Установка связей
  Variant.belongsTo(VariantType, {
    foreignKey: "variantTypeId",
    as: "variantType",
  });
  VariantType.hasMany(Variant, { foreignKey: "variantTypeId", as: "variants" });

  // Связь между User и Order: Один пользователь может иметь много заказов
  // User.hasMany(Order, { foreignKey: "userID" });
  // Order.belongsTo(User, { foreignKey: "userID" });

  // Связь между Order и Coupon: Один заказ может иметь один купон
  // Order.belongsTo(Coupon, { foreignKey: "couponCode" });
  // Coupon.hasMany(Order, { foreignKey: "couponCode" });

  // Связь многие ко многим между Order и Product через OrderItem
  Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId" });
  Product.belongsToMany(Order, { through: OrderItem, foreignKey: "productId" });
};
