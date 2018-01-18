module.exports = db => {
  let Task = db.createModel("Task", {
    title: db.type.string().required(),
    dueDate: db.type.string().required(),
    contact: db.type.string().required(),
    description: db.type.string().required()
  });

  return Task;
};
