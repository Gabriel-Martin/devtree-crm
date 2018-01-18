module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/tasks/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;
      let task = request.payload;

      this.models.Task.get(id).then(doc =>
        doc
          .merge(task)
          .save()
          .then(result => reply(result))
          .catch(err => reply(err))
      );
    }
  }
};
