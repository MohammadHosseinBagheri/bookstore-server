const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true,"نام کتاب اجباری است!"] },
    description: { type: String, required: [true," توضیحات کتاب اجباری است !"] },
    boughtCount: { type: Number, required: [true,"تعداد خریداران اجباری است!"], default: 0 },
    rate: { type: Number, required: true, default: 0 },
    rateCount: { type: Number, required: true, default: 0 },
    publisher: { type: objectId, ref: "users" },
    status: {
      type: Boolean,
      required: true,
      default: 0,
    },
    writer: { type: String, required: [true,"نام نویسنده اجباری است!"], },
    picPath: { type: String },
    comments: [{ type: objectId, ref: "comment" }],
    commentsCount: { type: Number, required: true, default: 0 },
    tags: { type: objectId, ref: "tag", required: false },
    price: { type: String, default: 0 },
    content: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
  }
);
const bookModel = mongoose.model("book", schema);
module.exports = bookModel;
