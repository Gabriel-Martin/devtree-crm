import React, { Component } from "react";
import api from "../api";
import { Form, Button, Icon } from "semantic-ui-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class EditCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        info: ""
      }
    };
  }

  onInputChange = (changeEvent, data) => {
    changeEvent.persist();

    console.log(data);

    this.setState(state => {
      return {
        customer: {
          ...state.customer,
          [changeEvent.target.name]: changeEvent.target.value
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

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();
    let id = this.props.match.params.id;

    api.customers.update(id, this.state.customer).then(() => {
      this.props.history.push(`/${this.state.customer.type}s`);
    });
  };

  componentDidMount() {
    let { id } = this.props.match.params;
    api.customers.getById(id).then(customer => {
      this.setState(state => {
        return {
          customer: customer
        };
      });
    });
  }

  render() {
    return (
      <div style={{ width: 650, padding: 10 }}>
        <Form style={{ padding: 20 }} onSubmit={this.onFormSubmit}>
          <h1>
            Update{" "}
            {this.state.customer.type === "prospect" ? "Prospect" : "Partner"}{" "}
            <Icon name="user" />
          </h1>
          <Form.Input
            name={"name"}
            value={this.state.customer.name}
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
            value={this.state.customer.list}
          />
          <Form.Input
            name={"company"}
            value={this.state.customer.company}
            type={"text"}
            placeholder={"Company"}
            onChange={this.onInputChange}
          />
          <Form.Input
            name={"email"}
            value={this.state.customer.email}
            type={"text"}
            placeholder={"Email"}
            onChange={this.onInputChange}
          />
          <Form.Input
            name={"phone"}
            value={this.state.customer.phone}
            type={"text"}
            placeholder={"Phone Number"}
            onChange={this.onInputChange}
          />
          <Form.Input
            name={"site"}
            value={this.state.customer.site}
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
export default EditCustomer;
