const CREATE_URL = (path = "") =>
  `https://devtree-crm.now.sh/api/customers/${path}`;

const create = data => {
  return fetch(CREATE_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

const getAll = () => {
  return fetch(CREATE_URL(), {
    headers: { Authorization: localStorage.getItem("token") }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

const getById = id => {
  return fetch(CREATE_URL(id), {
    headers: { Authorization: localStorage.getItem("token") }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

const remove = id => {
  return fetch(CREATE_URL(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

const update = (id, data) => {
  return fetch(CREATE_URL(id), {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export default {
  create,
  getAll,
  update,
  remove,
  getById
};
