module.exports = {
  method: "POST",
  path: "/api/users",
  config: {
    auth: {
      mode: "optional"
    },
    handler: function(request, reply) {
      // handler

      let user = new this.models.User(request.payload);

      user
        .save()
        .then(result => reply(result))
        .catch(err => {
          console.log(err);
          reply(err);
        });
    }
  }
};
