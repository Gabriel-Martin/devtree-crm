module.exports = {
  method: "POST",
  path: "/api/tasks",
  config: {
    handler: function(request, reply) {
      // handler
      let task = new this.models.Task(request.payload);

      task
        .save()
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
