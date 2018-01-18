module.exports = {
  method: "DELETE",
  path: "/api/customers/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;

      this.models.Customer
        .get(id)
        .then(doc => doc.delete())
        .then(response => reply(response))
        .catch(err => reply(err));
    }
  }
};
