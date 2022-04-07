const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: {
      type: Number,
      required: true,
      default: 1,
      enum: ["admin", "user"],
    },
  },
  { timestamps: { createdAt: "created_at" } }
);
const userModel = mongoose.model("user", schema);
module.exports = userModel;
