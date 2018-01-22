import React, { Component } from "react";
import api from "../api";
import { Icon, Form, Button } from "semantic-ui-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class CreateCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        type: this.props.match.params.type,
        info: ""
      }
    };
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        customer: {
          ...state.customer,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  selectChange = (changeE, { value }) => {
    this.setState(state => {
      return {
        customer: {
          ...state.customer,
          list: value
        }
      };
    });
  };

  handleEditorChange = text => {
    this.setState(state => {
      return {
        customer: {
          ...state.customer,
          info: text
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    api.customers.create(this.state.customer).then(() => {
      this.props.history.push(`/${this.props.match.params.type}s`);
    });
  };

  render() {
    console.log(this.state.customer);
    return (
      <div style={{ width: 650, padding: 10 }}>
        <Form style={{ padding: 20 }} onSubmit={this.onFormSubmit}>
          <h1>
            Create
            {this.props.match.params.type === "prospect"
              ? "Prospect"
              : "Partner"}
            <Icon name="add user" />
          </h1>
          <Form.Input
            name={"name"}
            type={"text"}
            placeholder={"Name"}
            onChange={this.onInputChange}
          />

          <Form.Dropdown
            placeholder={"type"}
            options={options}
            name="list"
            selection
            onChange={this.selectChange}
          />

          <Form.Input
            name={"company"}
            type={"text"}
            placeholder={"Company"}
            onChange={this.onInputChange}
          />
          <Form.Input
            name={"email"}
            type={"text"}
            placeholder={"Email"}
            onChange={this.onInputChange}
          />
          <Form.Input
            name={"phone"}
            type={"text"}
            placeholder={"Phone Number"}
            onChange={this.onInputChange}
          />
          <Form.Input
            name={"site"}
            type={"text"}
            placeholder={"Website"}
            onChange={this.onInputChange}
          />
          <ReactQuill
            style={{ height: 300 }}
            theme="snow"
            value={this.state.customer.info}
            onChange={this.handleEditorChange}
          />
          <br />
          <br />
          <br />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

const options = [
  { key: 1, text: "business", value: "business" },
  { key: 2, text: "student", value: "student" },
  { key: 3, text: "other", value: "other" }
];
export default CreateCustomer;
