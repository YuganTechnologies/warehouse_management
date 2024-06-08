//Internal Lib Import
const ProductModel = require("../../model/Product/ProductModel");
const CreateService = require("../../services/product/CreateService");
const UpdateService = require("../../services/product/UpdateService");
const DeleteService = require("../../services/product/DeleteService");
const GetAllProductsService = require("../../services/Product/GetAllProductsService");

// Controller function for creating a new product
const createProduct = async (req, res, next) => {
  try {
    // Call the CreateService to create the product
    const product = await CreateService(req, ProductModel);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Controller function for updating an existing product
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatedFields = req.body;
     // Call the UpdatService to delete the product
    const updatedProduct = await UpdateService(productId, updatedFields, ProductModel);

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Controller function for deleting a product
const deleteProduct = async (req, res, next) => {
  try {
    // Call the DeleteService to delete the product
    const result = await DeleteService(req, ProductModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};


// Controller function for getting all products
const getAllProducts = async (req, res, next) => {
  try {
    // Call the GetAllService to get all products
    const products = await GetAllProductsService(ProductModel);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
