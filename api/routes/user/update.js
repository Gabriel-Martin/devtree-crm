module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/users/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;
      let user = request.payload;

      this.models.User
        .get(id)
        .update(user)
        .then(result => reply(result))
        .catch(err => reply(err));
    }
  }
};
