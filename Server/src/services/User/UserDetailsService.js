//External Lib Import
const { ObjectId } = require("mongoose").Types;

const UserDetailsService = async (Request, DataModel) => {
  const { UserId } = Request;

  return await DataModel.aggregate([
    { $match: { _id: ObjectId(UserId) } },
    {
      $project: {
        Password: 0,
      },
    },
  ]);
};
module.exports = UserDetailsService;
