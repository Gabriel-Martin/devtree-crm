const thinky = require("thinky");

const db = thinky({
  db: "devtreeCRM",
  host: "ec2-34-208-49-84.us-west-2.compute.amazonaws.com",
  port: 28015
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
