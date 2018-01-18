module.exports = db => {
  let Customer = db.createModel("Customer", {
    name: db.type.string().required(),
    company: db.type.string().required(),
    email: db.type.string().required(),
    phone: db.type.string().required(),
    site: db.type.string().required(),
    info: db.type.string().required(),
    type: db.type
      .string()
      .enum("prospect", "partner")
      .required()
  });

  return Customer;
};
