const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, //unique 인데 null 이어도 에러 방지
  },
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // bcrypt
  // this.password 는 db에 있는 것
  if (plainPassword === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({ error: "error" });
};
const User = mongoose.model("User", userSchema);

module.exports = User;
