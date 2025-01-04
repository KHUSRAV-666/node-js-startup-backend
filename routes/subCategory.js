const express = require("express");
const router = express.Router();
const SubCategory = require("../model/subcategory.model");
const Brand = require("../model/brand.model");
const Product = require("../model/product.model");
const asyncHandler = require("express-async-handler");
const Category = require("../model/category.model");

// Get all sub-categories
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const subCategories = await SubCategory.findAll({
        include: {
          model: Category, // Указываем модель SubCategory, с которой нужно выполнить join
          required: true, // Убирает бренды без подкатегории
          as: "category", // Используем алиас, указанный в ассоциации
        },
        order: [
          ["categoryId", "ASC"], // Сортировка по полю subcategoryId (по возрастанию)
        ],
      });
      res.json({
        success: true,
        message: "Sub-categories retrieved successfully.",
        data: subCategories,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Get a sub-category by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const subCategoryID = req.params.id;
      const subCategory = await SubCategory.findByPk(subCategoryID, {
        include: {
          model: Category, // Указываем модель Category, с которой нужно выполнить join
          as: "category", // Используем алиас, указанный в ассоциации
        },
      });
      // const subCategory = await SubCategory.findByPk(subCategoryID).populate('categoryId');
      if (!subCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Sub-category not found." });
      }
      res.json({
        success: true,
        message: "Sub-category retrieved successfully.",
        data: subCategory,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Create a new sub-category
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Name and category ID are required.",
      });
    }

    try {
      const subCategory = new SubCategory({ name, categoryId });
      const newSubCategory = await subCategory.save();
      res.json({
        success: true,
        message: "Sub-category created successfully.",
        data: null,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Update a sub-category
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const subCategoryID = req.params.id;
    const { name, categoryId } = req.body;
    if (!name || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Name and category ID are required.",
      });
    }

    try {
      const updatedSubCategory = await SubCategory.update(
        { name, categoryId },
        {
          where: { id: subCategoryID }, // Условие для поиска по id
          returning: true, // Указывает, чтобы вернулся обновленный объект
        }
      );
      if (!updatedSubCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Sub-category not found." });
      }
      res.json({
        success: true,
        message: "Sub-category updated successfully.",
        data: null,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Delete a sub-category
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const subCategoryID = req.params.id;
    try {
      // Check if any brand is associated with the sub-category
      const brandCount = await Brand.count({
        where: { subcategoryId: subCategoryID }
      });
      
      if (brandCount > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot delete sub-category. It is associated with one or more brands.",
        });
      }

      // Check if any products reference this sub-category
      const products = await Product.findAll({ proSubCategoryId: subCategoryID });
      if (products.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete sub-category. Products are referencing it.",
        });
      }

      // If no brands or products are associated, proceed with deletion of the sub-category
      const subCategory = await SubCategory.findByPk(subCategoryID);
      if (!subCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Sub-category not found." });
      }
      await subCategory.destroy();
      res.json({
        success: true,
        message: "Sub-category deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

module.exports = router;
