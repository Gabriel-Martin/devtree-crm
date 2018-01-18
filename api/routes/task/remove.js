module.exports = {
  method: "DELETE",
  path: "/api/tasks/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;

      this.models.Task
        .get(id)
        .then(doc => doc.delete())
        .then(response => reply(response))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
