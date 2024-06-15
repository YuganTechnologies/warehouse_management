// //Internal Lib Import
// const app = require("./app");
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080; // Ensure this matches the port you're using in your fetch request

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.set("strictQuery", false); // Address the deprecation warning

mongoose.connect("mongodb://0.0.0.0:27017/WareHouse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a schema and model for the users
const usersSchema = new mongoose.Schema({
  _id: Number,
  Email_1: String,
  username_1: String,
  Password_text: String,
});

// const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  bale_no: {
    type: String,
    required: true,
  },
  rfd_white: {
    type: String,
    required: true,
  },
  order_no: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  construction: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  weave: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  no_of_pcs: {
    type: Number,
    required: true,
  },
  pcs_mtr: {
    type: Number,
    required: true,
  },
  meter: {
    type: Number,
    required: true,
  },
  dispatch_meter: {
    type: Number,
    required: true,
  },
  available_meter: {
    type: Number,
    required: true,
  },
});

const Users = mongoose.model("Users", usersSchema, "users");

const Product = mongoose.model("Product", productSchema, "product");

// Route for registering a user
app.post("/api/v1/Auth/RegisterUser", async (req, res) => {
  console.log("Received registration data:", req.body);

  const newUsers = new Users(req.body);

  try {
    const savedUsers = await newUsers.save();
    res
      .status(200)
      .json({ message: "User is registered", UserData: savedUsers });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Route for fetching all users
app.get("/api/v1/Auth/LoginUser", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});
// Route for fetching all products
app.get("/api/v1/Product/allProduct", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// Route for creating a new product
app.post("/api/v1/Product/create", async (req, res) => {
  console.log("Received product data:", req.body);

  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "Product created successfully", product: savedProduct });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err });
  }
});


// Start the server
app
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Please choose a different port.`
      );
    } else {
      console.error(err);
    }
  });
