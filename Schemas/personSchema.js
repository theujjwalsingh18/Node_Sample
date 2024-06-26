const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  work: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  // Cnevrting string password into decrypt password
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    // Updating the string password to hash or decrypt password
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Writing function to match the password to give access

personSchema.methods.matchPassword = async function (user_password) {
  try {
    const isMatch = await bcrypt.compare(user_password, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const aadmi = mongoose.model("aadmi", personSchema);
module.exports = aadmi;
