//External Lib Import
const { model, Schema } = require("mongoose");

const ProductSchema = new Schema(
  {
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
      type: String,
      required: true,
    },
    construction: {
      type: String,
      required: true,
    },
    width: {
      type: String,
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
  },
  { versionKey: false, timestamps: true }
);

const ProductModel = model("Product", ProductSchema);
module.exports = ProductModel;
