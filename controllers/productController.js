const Product = require("../models/productModel");
const {
  checkInput,
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  updateElementByIdFactory,
  deleteElementByIdFactory,
} = require("../utility/crudFactory");


const getProductHandler = getAllFactory(Product);
const createProducthandler = createFactory(Product);
const getproductById = getElementByIdFactory(Product);
const updateProductById = updateElementByIdFactory(Product);
const deleteProductById = deleteElementByIdFactory(Product);
const getProductCategories = async function(req, res) {
  res.json({
    message: "categories",
    data: ["Electronics", "Jewelery", "Clothing", "Fitness", "Books", "Furniture"],
  });
}

module.exports = {
    getProductHandler,
    createProducthandler,
    getproductById,
    updateProductById,
    deleteProductById,
    getProductCategories
};
