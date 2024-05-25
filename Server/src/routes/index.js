//External Lib Import
const routes = require("express").Router();

//Internal Lib Import
const AuthRoutes = require("./AuthRoutes");
const EmployeeRoutes = require("./EmployeeRoutes");

//Auth Routes
routes.use("/Auth", AuthRoutes);

//Employee Routes
routes.use("/Employee", EmployeeRoutes);



module.exports = routes;
