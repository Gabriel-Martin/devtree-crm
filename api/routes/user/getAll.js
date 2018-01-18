module.exports = {
  method: "GET",
  path: "/api/users",
  config: {
    handler: function(request, reply) {
      this.models.User
        .filter({})
        .then(result => reply(result))
        .catch(err => reply(err));
    }
  }
};
