const models = require("./models");
const routes = require("./routes");

module.exports.register = (server, options, next) => {
  server.bind({
    models: models
  });

  server.auth.strategy("jwt", "jwt", {
    key: "secrets", // Never Share your secret key
    validateFunc: function(decoded, request, callback) {
      // do your checks to see if the person is valid
      if (!decoded.id) {
        return callback(null, false);
      } else {
        return callback(null, true);
      }
    }, // validate function defined above
    verifyOptions: { algorithms: ["HS256"] } // pick a strong algorithm
  });

  server.auth.default("jwt");

  server.route(routes);

  next();
};

module.exports.register.attributes = {
  name: "api",
  version: "0.0.7"
};
