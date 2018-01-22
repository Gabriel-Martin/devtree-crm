import React, { Component } from "react";
import api from "../api";
import { Button, Table, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

class TaskBoard extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      tasks: [],
      error: false
    };
  }

  componentDidMount() {
    api.tasks.getAll().then(tasks => {
      if (!tasks.length && tasks.length !== 0) {
        console.log("Return value was not an Array of Tasks", tasks);
        tasks = [];

        this.setState(state => {
          return {
            error: "Unable to fetch tasks"
          };
        });
      }
      this.setState(state => {
        return {
          tasks: tasks
        };
      });
    });
  }

  removeTask = id => {
    api.tasks.remove(id).then(res => {
      console.log(id, res);
      api.tasks.getAll().then(tasks => {
        if (!tasks.length && tasks.length !== 0) {
          // console.log("Return value was not an Array of Tasks", tasks);
          tasks = [];

          this.setState(state => {
            return {
              error: "Unable to fetch tasks"
            };
          });
        }
        this.setState(state => {
          return {
            open: false,
            tasks: tasks
          };
        });
      });
    });
  };

  updateTask = id => {
    this.props.history.push(`/editTask/${id}`);
  };

  show = () => this.setState({ open: true });
  hide = () => this.setState({ open: false });

  render() {
    let { tasks, error } = this.state;
    return (
      <div
        style={{
          padding: 20
        }}
      >
        <Button onClick={() => this.props.history.push(`/`)} animated>
          <Button.Content visible>{"Dashboard"}</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
        <br />
        <br />
        <br />
        <div />

        <Segment
          color="teal"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <h1>Task Board</h1>

          <div>
            <Button onClick={() => this.props.history.push(`/create-task`)}>
              Create Task
            </Button>
          </div>
        </Segment>

        <br />
        {error && <div>{error}</div>}
        <Table color={"teal"} columns={5} celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <b>
                  <u>TASK</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>
                  <u>DUE DATE</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>
                  <u>CONTACT</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>
                  <u>DESCRIPTION</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign={"center"}>
                <b>
                  <u>EDIT / DELETE</u>
                </b>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {tasks.map(t => (
            <Table.Row key={t.id}>
              <Table.Cell>
                <p>{t.title}</p>
              </Table.Cell>
              <Table.Cell>
                <p>
                  {t.dueDate}
                  {new Date(t.dueDate).getTime() < new Date().getTime() ? (
                    <span style={{ paddingLeft: 5 }}>
                      <Label basic color="red" pointing="left" horizontal>
                        DUE
                      </Label>
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p>
                  {t.customer && (
                    <Link to={`/${t.customer.type}s/${t.customer.id}`}>
                      {t.contact}
                    </Link>
                  )}
                </p>
              </Table.Cell>
              <Table.Cell>
                <p>{t.description}</p>
              </Table.Cell>

              <Table.Cell style={{ padding: 20 }} textAlign={"center"}>
                <Button onClick={() => this.updateTask(t.id)}>
                  <Icon name="edit" />
                </Button>
                <Button onClick={() => this.removeTask(t.id)}>
                  <Icon name="trash outline" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </div>
    );
  }
}

export default TaskBoard;
