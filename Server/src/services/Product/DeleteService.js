//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");

const DeleteService = async (Request, ProductModel) => {
  try {
    const { productId } = Request.params; // Extract product_id from params

    // Find and delete the product by product_id
    const deletedProduct = await ProductModel.findOneAndDelete({ product_id: productId });

    if (!deletedProduct) {
      throw CreateError("Product not found", 404);
    }

    return deletedProduct;
  } catch (error) {
    throw error; 
  }
};

module.exports = DeleteService;
