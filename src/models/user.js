const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/sirgray/image/upload/v1649421249/users/user_doqern.png",
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    userBookDetail: { ref: "userBookDetail", type: objectId },
  },
  { timestamps: { createdAt: "created_at" } }
);
const userModel = mongoose.model("user", schema);
module.exports = userModel;
