// Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");

const GetAllProductsService = async (ProductModel) => {
  try {
    const products = await ProductModel.find();
    if (!products) {
      throw CreateError("No products found", 404);
    }
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = GetAllProductsService;
