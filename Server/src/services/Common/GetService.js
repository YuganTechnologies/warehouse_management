//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

const GetService = async (RequestField, RequestID, DataModel) => {

  const data = await DataModel.aggregate([
    {
      $match: {
        $and: [{ [RequestField]: ObjectId(RequestID) }],
      },
    },
  ]);

  return data;
};

module.exports = GetService;
