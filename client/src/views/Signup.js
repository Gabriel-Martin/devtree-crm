import React, { Component } from "react";
import api from "../api";
import { Button, Form, Icon } from "semantic-ui-react";

class Signup extends Component {
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
      .signup(this.state.credentials)
      .then(user => {
        this.props.history.push("/login");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div>
          <Button onClick={() => this.props.history.push(`/`)} animated>
            <Button.Content visible>{"Dashboard"}</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ textAlign: "center", width: 600, margin: "auto" }}>
          <Form style={{ padding: 20 }} onSubmit={this.onFormSubmit}>
            <h1>
              Add User <Icon name="user" />
            </h1>
            <Form.Input
              type={"text"}
              name={"name"}
              placeholder={"Name"}
              onChange={this.onInputChange}
            />
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

export default Signup;
