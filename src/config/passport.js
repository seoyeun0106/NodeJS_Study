const passport = require("passport");
const User = require("../models/users.model");
const LocalStrategy = require("passport-local").Strategy;

// req.login(user)
// 세션 데이터 작성
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //  id는 passport 가 넣어주는 것

  User.findById(id).then((user) => {
    done(null, user); //req.user = user
  });
});

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const data = await User.findOne({
          email: email.toLocaleLowerCase(),
        });
        if (!data) {
          return done(null, false, {
            message: `Email ${email} not found`,
          });
        }
        data.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) return done(null, data);

          return done(null, false, {
            msg: "Invalid email or pwd",
          });
        });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
