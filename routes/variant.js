const express = require("express");
const router = express.Router();
const Variant = require("../model/variant.model");
const Product = require("../model/product.model");
const asyncHandler = require("express-async-handler");
const VariantType = require("../model/varianttype.model");
const { where } = require("sequelize");

// Get all variants
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const variants = await Variant.findAll({
        include: [
          {
            model: VariantType, // Связанная модель для `variantTypeId`
            as: "variantType", // Имя ассоциации, если используется
          },
        ],
        order: [["variantTypeId", "ASC"]], // Сортировка по `variantTypeId` в порядке возрастания
      });
      res.json({
        success: true,
        message: "Variants retrieved successfully.",
        data: variants,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Get a variant by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const variantID = req.params.id;
      const variant = await Variant.findByPk(variantID, {
        include: [
          {
            model: VariantType, // Связанная модель для `variantTypeId`
            as: "variantType", // Имя ассоциации, если используется
          },
        ],
      });
      if (!variant) {
        return res
          .status(404)
          .json({ success: false, message: "Variant not found." });
      }
      res.json({
        success: true,
        message: "Variant retrieved successfully.",
        data: variant,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Create a new variant
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, variantTypeId } = req.body;
    if (!name || !variantTypeId) {
      return res.status(400).json({
        success: false,
        message: "Name and VariantType ID are required.",
      });
    }

    try {
      const variant = new Variant({ name, variantTypeId });
      const newVariant = await variant.save();
      res.json({
        success: true,
        message: "Variant created successfully.",
        data: null,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Update a variant
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const variantID = req.params.id;
    const { name, variantTypeId } = req.body;
    if (!name || !variantTypeId) {
      return res.status(400).json({
        success: false,
        message: "Name and VariantType ID are required.",
      });
    }

    try {
      const updatedVariant = await Variant.update(
        { name, variantTypeId },
        { where: { id: variantID }, returning: true }
      );
      if (!updatedVariant) {
        return res
          .status(404)
          .json({ success: false, message: "Variant not found." });
      }
      res.json({
        success: true,
        message: "Variant updated successfully.",
        data: null,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

// Delete a variant
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const variantID = req.params.id;
    try {
      // Check if any products reference this variant
      const products = await Product.findAll({ proVariantId: variantID });
      if (products.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete variant. Products are referencing it.",
        });
      }

      // If no products are referencing the variant, proceed with deletion
      const variant = await Variant.findByPk(variantID);
      if (!variant) {
        return res
          .status(404)
          .json({ success: false, message: "Variant not found." });
      }
      variant.destroy();
      res.json({ success: true, message: "Variant deleted successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  })
);

module.exports = router;
