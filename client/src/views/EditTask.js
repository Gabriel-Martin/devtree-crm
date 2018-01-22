import React, { Component } from "react";
import api from "../api";
import { Icon, Form, Button } from "semantic-ui-react";

class EditTask extends Component {
  constructor() {
    super();

    this.state = {
      task: {}
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

  onFormSubmit = submitEvent => {
    submitEvent.preventDefault();

    let taskId = this.props.match.params.id;

    api.tasks.update(taskId, this.state.task).then(() => {
      this.props.history.push("/taskboard");
    });
  };

  componentDidMount() {
    let taskId = this.props.match.params.id;

    api.tasks.getById(taskId).then(task => {
      if (!task.id) {
        console.log("No Task here.", task);
        task = {};
        this.setState(state => {
          return {
            error: "Unable to fetch task"
          };
        });
      }
      this.setState(state => {
        return {
          task: task
        };
      });
    });
  }

  render() {
    return (
      <div style={{ width: 650, padding: 10 }}>
        <Form style={{ padding: 20 }} onSubmit={this.onFormSubmit}>
          <h1>
            Update Task <Icon name="checked calendar" />
          </h1>
          <Form.Input
            name={"title"}
            value={this.state.task.title}
            placeholder={"Task"}
            onChange={this.onInputChange}
            type="text"
          />
          <Form.Input
            name={"contact"}
            value={this.state.task.contact}
            placeholder={"Contact"}
            onChange={this.onInputChange}
            type="text"
          />
          Due Date:
          <Form.Input
            name={"dueDate"}
            value={this.state.task.dueDate}
            placeholder={"Due Date"}
            onChange={this.onInputChange}
            type="date"
          />
          <Form.TextArea
            name={"description"}
            value={this.state.task.description}
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

export default EditTask;
