// Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");

const CreateService = async (Request, ProductModel) => {
  const PostBody = Request.body;

  // Check if product already exists by product_id
  const existingProduct = await ProductModel.findOne({ product_id: PostBody.product_id });
  if (existingProduct) {
    throw CreateError("Product already exists", 400); // Custom error message for existing product
  }

  // Create new product
  const data = new ProductModel(PostBody);
  return await data.save();
};

module.exports = CreateService;
