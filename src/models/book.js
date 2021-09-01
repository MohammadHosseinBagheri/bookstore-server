const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    boughtCount: { type: Number, required: true, default: 0 },
    rate: { type: Number, required: true, default: 0 },
    rateCount: { type: Number, required: true, default: 0 },
    publisher: { type: objectId, ref: "users" },
    status: {
      type: Boolean,
      required: true,
      default: 0,
    },
    writer: { type: objectId, ref: "users", required: true },
    picPath: { type: String },
    comments: [{ type: objectId, ref: "comment" }],
    commentsCount: { type: Number, required: true, default: 0 },
    tags: [{ type: objectId, ref: "tag" }],
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
