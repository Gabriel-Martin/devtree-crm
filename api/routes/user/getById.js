module.exports = {
  method: "GET",
  path: "/api/users/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;

      this.models.User
        .get(id)
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
