const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 10,
    max: 13,
  },
});
module.exports = mongoose.model("User", UserSchema);
