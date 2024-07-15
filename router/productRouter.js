const express = require("express");
const ProductRouter = express.Router();
const {
  createProducthandler,
  getproductById,
  updateProductById,
  deleteProductById,
  getProductHandler
} = require("../controller/productController");
const { checkInput } = require("../controller/middleWares");

ProductRouter.post("/", checkInput, createProducthandler);
ProductRouter.get("/", getProductHandler);
ProductRouter.get("/:productId", getproductById);
ProductRouter.delete("/:productId", deleteProductById);
ProductRouter.patch("/:id", updateProductById);

module.exports = ProductRouter;
