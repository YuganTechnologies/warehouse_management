//External Lib Import
const { ObjectId } = require("mongoose").Types;

const UserBlockService = async (Request, UsersModel) => {
  const UserId = Request.id;

  return await UsersModel.updateOne(
    { _id: ObjectId(UserId) },
    {
      AccountStatus: "REJECTED",
    },
  );
};

module.exports = UserBlockService;
