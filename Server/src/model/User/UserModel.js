//External Lib Import
const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    DepartmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: false,
    },
    DeptName: {
      type: String,
    },
    FirstName: {
      type: String,
      required: false,
    },
    LastName: {
      type: String,
      required: false,
    },
    Gender: {
      type: String,
      required: false,
    },
    DateOfBirth: {
      type: String,
      required: false,
    },
    Address: {
      type: String,
      required: false,
    },
    Phone: {
      type: String,
      required: false,
      unique: true,
    },
    Email: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (prop) => `Invalid Email Address: ${prop.value}`,
      },
      unique: true,
    },
    Password: {
      type: String,
      required: false,
    },
    Roles: {
      type: String,
      enum: ["STAFF", "HOD", "ADMIN"],
      default: "STAFF",
      required: false,
    },
    Image: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const UserModel = model("Employee", UserSchema);
module.exports = UserModel;
