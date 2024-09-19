const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema =  new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String, 
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function(password) {
  console.log("Comparing passwords:");
  console.log("Input password:", password);
  console.log("Stored hashed password:", this.password);
  const isMatch = await bcrypt.compare(password, this.password);
  console.log("Password match:", isMatch);
  return isMatch;
};

const User = model('User', userSchema);

module.exports = User;