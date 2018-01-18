module.exports = {
  method: "GET",
  path: "/api/tasks",
  config: {
    handler: function(request, reply) {
      this.models.Task
        .filter({})
        .getJoin({ customer: true })
        .then(result => reply(result))
        .catch(err => reply(err));
    }
  }
};
