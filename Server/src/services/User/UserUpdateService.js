//External Lib Import
const { ObjectId } = require("mongoose").Types;

const UserUpdateService = async (Request, DataModel) => {
  const { UserId } = Request;
  const {
    FirstName,
    LastName,
    Gender,
    DateOfBirth,
    Address,
    Phone,
    Image,
    Email,
  } = Request.body;

  await DataModel.findByIdAndUpdate(
    { _id: ObjectId(UserId) },
    {
      Email,
      FirstName,
      LastName,
      Gender,
      DateOfBirth,
      Address,
      Phone,
      Image,
    },
    { new: true },
  );

  return { message: "User Update Successfull" };
};
module.exports = UserUpdateService;
