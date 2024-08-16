//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");
const { HashPassword } = require("../../utility/BcryptHelper");
const UserCreateService = async (Request, DataModel) => {
  let PostBody = Request.body;

  const User = await DataModel.aggregate([
    {
      $match: { Email: PostBody.Email },
    },
  ]);

  if (User.length > 0) {
    throw CreateError("User Already Created", 400);
  }

  PostBody.Password = await HashPassword(PostBody.Password);

  await DataModel.create(PostBody);
  return { message: "User Create Successfull" };
};
module.exports = UserCreateService;
