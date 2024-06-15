//External Lib Import
const { ObjectId } = require("mongoose").Types;

const UserActiveService = async (Request, UsersModel) => {
  const UserId = Request.id;

  return await UsersModel.updateOne(
    { _id: ObjectId(UserId) },
    {
      AccountStatus: "ACTIVE",
    },
  );
};

module.exports = UserActiveService;
