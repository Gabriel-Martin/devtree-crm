module.exports = {
  method: ["PUT", "PATCH"],
  path: "/api/customers/{id}",
  config: {
    handler: function(request, reply) {
      let id = request.params.id;
      let customer = request.payload;

      this.models.Customer.get(id).then(doc =>
        doc
          .merge(customer)
          .save()
          .then(result => reply(result))
          .catch(err => reply(err))
      );
    }
  }
};
