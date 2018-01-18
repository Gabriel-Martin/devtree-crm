const bcrypt = require("bcrypt-as-promised");
const jwt = require("jsonwebtoken");

module.exports = db => {
  let User = db.createModel("User", {
    name: db.type.string().required(),
    email: db.type.string().required(),
    password: db.type.string().required()
  });

  User.define("generatePassword", function() {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => Object.assign(this, { password: hash }))
      .catch(err => err);
  });

  User.define("comparePassword", function(password) {
    return bcrypt
      .compare(password, this.password)
      .then(authed => (authed ? this : false))
      .catch(err => err);
  });

  User.define("generateJWT", function(user) {
    return jwt.sign(Object.assign({}, this), "secrets", {
      algorithm: "HS256"
    });
  });

  User.pre("save", function(next) {
    User.filter({ email: this.email }).then(users => {
      if (users.length > 0) {
        return next("email/password combo invalid");
      } else {
        return this.generatePassword()
          .then(() => next())
          .catch(err => next(err));
      }
    });
  });

  return User;
};
