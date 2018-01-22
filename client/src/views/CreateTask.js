import React, { Component } from "react";
import api from "../api";

import { Dropdown, Form, Button, Icon, TextArea } from "semantic-ui-react";

class CreateTask extends Component {
  constructor() {
    super();

    this.state = {
      task: {},
      customers: []
    };
  }

  onInputChange = changeEvent => {
    changeEvent.persist();

    this.setState(state => {
      return {
        task: {
          ...state.task,
          [changeEvent.target.name]: changeEvent.target.value
        }
      };
    });
  };

  onSelectInputChange = (e, data) => {
    this.setState(state => {
      return {
        task: {
          ...state.task,
          contact: data.value.name,
          [data.name]: data.value.id
        }
      };
    });
  };

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    api.tasks.create(this.state.task).then(() => {
      this.props.history.push("/taskboard");
    });
  };

  componentDidMount() {
    api.customers.getAll().then(customers => {
      this.setState(state => {
        return {
          customers
        };
      });
    });
  }

  render() {
    const { customers } = this.state;
    return (
      <div style={{ width: 650, padding: 10 }}>
        <Form style={{ padding: 20 }} onSubmit={this.onFormSubmit}>
          <h1>
            Create Task <Icon name="add to calendar" />
          </h1>
          <Dropdown
            placeholder="Select Contact"
            fluid
            search
            selection
            name={"customerId"}
            onChange={this.onSelectInputChange}
            options={customers.map(customer => ({
              key: customer.id,
              value: customer,
              text: `Name: ${customer.name} - Company: ${
                customer.company
              } - Type: ${customer.list}`
            }))}
          />
          <br />
          <br />
          <Form.Input
            name={"contact"}
            placeholder={"Contact"}
            value={this.state.task.contact}
            onChange={this.onInputChange}
            type="text"
          />
          <Form.Input
            name={"title"}
            placeholder={"Task"}
            onChange={this.onInputChange}
            type="text"
          />
          Due Date:
          <Form.Input
            name={"dueDate"}
            placeholder={"Due Date"}
            onChange={this.onInputChange}
            type="date"
          />
          <Form.TextArea
            name={"description"}
            placeholder={"Description"}
            onChange={this.onInputChange}
            type="text"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default CreateTask;
