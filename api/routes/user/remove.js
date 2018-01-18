module.exports = {
  method: "DELETE",
  path: "/api/users/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;

      this.models.User
        .get(id)
        .delete()
        .then(response => reply(response))
        .catch(err => reply(err));
    }
  }
};
