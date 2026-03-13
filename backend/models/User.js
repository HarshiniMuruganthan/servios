const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ["user", "technician", "admin"],
    default: "user"
  },

  service: String,   // only technicians use this

  location: {
    city: String,
    area: String
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);