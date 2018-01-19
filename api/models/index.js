const thinky = require("thinky");

const db = thinky({
  db: "devtreeCRM"
});

let Customer = require("./customer")(db);
let Task = require("./task")(db);
let User = require("./user")(db);

Task.hasOne(Customer, "customer", "customerId", "id");
Customer.hasMany(Task, "tasks", "id", "customerId");

module.exports = {
  User: User,
  Task: Task,
  Customer: Customer
};
