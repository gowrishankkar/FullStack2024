const express = require("express");
const ProductRouter = express.Router();
const {
  createProducthandler,
  getproductById,
  updateProductById,
  deleteProductById,
  getProductHandler,
} = require("../controller/productController");
const { checkInput } = require("../controller/middleWares");
async function getProducts(req, res) {

  const sortQuery = req.query.sort;
  const selectQuery = req.query.select;
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = (page - 1) * limit; 
  console.log("skip ", skip);
  /** filter  */
  const filterQuery = req.query.filter;
  console.log("filter query ", filterQuery);

  let queryResPromise = Product.find();
  if (sortQuery) {
    const [sortParam, order] = sortQuery.split(" ");
    console.log("sortParam", sortParam);
    console.log("order", order);
    if (order === "asc") {
      queryResPromise = queryResPromise.sort(sortParam);
    } else {
      queryResPromise = queryResPromise.sort(`-${sortParam}`);
    }
  }
  if(selectQuery){
    queryResPromise = queryResPromise.select(selectQuery)
  }
  if(limit){
    queryResPromise = queryResPromise.skip(skip).limit(limit)
  }
  if (filterQuery) {
 
    const filterObj = JSON.parse(filterQuery);
 
    const filterObjStr = JSON.stringify(filterObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    const filterObjFinal = JSON.parse(filterObjStr);
    console.log("filter obj final ", filterObjFinal);
    queryResPromise = await queryResPromise.find(filterObjFinal);
  }
  const result = await queryResPromise;

  res.status(200).json({
    message: "search successfull",
    data: result,
  });
}

ProductRouter.post("/", checkInput, createProducthandler);
ProductRouter.get("/", getProducts);
ProductRouter.get("/:productId", getproductById);
ProductRouter.delete("/:productId", deleteProductById);
ProductRouter.patch("/:id", updateProductById);

module.exports = ProductRouter;
