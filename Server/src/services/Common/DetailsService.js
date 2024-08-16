//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

const DetailsService = async (Request, DataModel) => {
  const DetailsID = Request.params.id;
console.log(DetailsID)
console.log(DataModel)
  const data = await DataModel.aggregate([
    {
      $match: {
        $and: [{ _id: ObjectId(DetailsID) }],
      },
    },
  ]);
console.log('data',data)
  return data;
};

module.exports = DetailsService;
