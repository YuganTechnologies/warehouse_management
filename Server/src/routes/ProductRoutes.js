//External Lib Import
const ProductRoutes = require("express").Router();

//Internal Lib Import
const ProductControllers = require("../controller/Product/ProductControllers");

// Route for creating a new product
ProductRoutes.post("/create", ProductControllers.createProduct);

// Route for updating an existing product
ProductRoutes.put("/update/:productId", ProductControllers.updateProduct);

// Route for deleting a product
ProductRoutes.delete("/delete/:productId", ProductControllers.deleteProduct);

module.exports = ProductRoutes;
