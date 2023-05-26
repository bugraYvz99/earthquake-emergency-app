const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: { type: String, required: false },
  lastName: { type: String, required: false },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, enum: ["volunteer", "expert"], default: "volunteer" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      phoneNumber: this.phoneNumber,
      name: this.name,
      lastName: this.lastName,
      role: this.role,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
