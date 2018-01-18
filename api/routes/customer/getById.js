module.exports = {
  method: "GET",
  path: "/api/customers/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;

      this.models.Customer
        .get(id)
        .getJoin({ tasks: true })
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
