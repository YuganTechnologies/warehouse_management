//External Lib Import
const routes = require("express").Router();

//Internal Lib Import
const AuthRoutes = require("./AuthRoutes");
const EmployeeRoutes = require("./EmployeeRoutes");
const ProductRoutes = require("./ProductRoutes");

//Auth Routes
routes.use("/Auth", AuthRoutes);

//Employee Routes
routes.use("/Employee", EmployeeRoutes);

//Product Routes
routes.use("/Product", ProductRoutes); 


module.exports = routes;
