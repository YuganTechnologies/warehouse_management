// Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");

const UpdateService = async (productId, updatedFields, ProductModel) => {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { product_id: productId }, 
      updatedFields, 
      { new: true }
    );

    if (!updatedProduct) {
      throw CreateError("Product not found", 404);
    }

    return updatedProduct;
  } catch (error) {
    throw error; // Propagate the error without wrapping
  }
};

module.exports = UpdateService;
