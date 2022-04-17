const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = new mongoose.Schema({
  bookId: { type: objectId, ref: "book", },
  percent: { type: Number, default: 0 },
  isFavorite: { type: Boolean, default: false },
  isBought: { type: Boolean, default: false },
  userId: { type: objectId, ref: "user", required: true },
});

const userBookDetailModel = mongoose.model("userBookDetail", schema);
module.exports = userBookDetailModel;
