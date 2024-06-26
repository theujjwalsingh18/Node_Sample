const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const aadmi = require("./Schemas/personSchema");

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await aadmi.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isPasswordMatch = await user.matchPassword(password);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
