module.exports = {
  method: "POST",
  path: "/api/customers",
  config: {
    handler: function(request, reply) {
      // handler
      let customer = new this.models.Customer(request.payload);

      customer
        .save()
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
