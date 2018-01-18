module.exports = {
  method: "GET",
  path: "/api/customers",
  config: {
    handler: function(request, reply) {
      this.models.Customer
        .filter({})
        .then(result => reply(result))
        .catch(err => reply(err));
    }
  }
};
