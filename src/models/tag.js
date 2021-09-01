const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagType: {
      type: String,
      required: true,
      enum: ["interest", "category"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
  }
);
const tagModel = mongoose.model("tag", schema);
module.exports = tagModel;
