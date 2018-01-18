import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

import api from "../api";

import jwt from "jsonwebtoken";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      credentials: {}
    };
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        credentials: {
          ...state.credentials,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    api.users
      .login(this.state.credentials)
      .then(user => {
        if (user.error) {
          return;
        }

        localStorage.setItem("token", user.token);

        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  componentWillMount() {
    let token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    token = jwt.decode(token);

    if (!token || !token.id) {
      return localStorage.removeItem("token");
    }

    return this.props.history.replace("/");
  }

  render() {
    return (
      <div style={{ padding: 8 }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ textAlign: "center", width: 600, margin: "auto" }}>
          <Form style={{ padding: 20 }} onSubmit={this.onFormSubmit}>
            <h1>Login</h1>
            <Form.Input
              type={"email"}
              name={"email"}
              placeholder={"Email"}
              onChange={this.onInputChange}
            />
            <Form.Input
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              onChange={this.onInputChange}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
