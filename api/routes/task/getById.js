module.exports = {
  method: "GET",
  path: "/api/tasks/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;

      this.models.Task
        .get(id)
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
