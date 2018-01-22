import React, { Component } from "react";
import api from "../api";
import {
  Button,
  Table,
  Header,
  Rating,
  Icon,
  Confirm,
  Popup,
  Dropdown,
  Modal,
  Card
} from "semantic-ui-react";
import renderHTML from "react-render-html";

class CreateTask extends Component {
  constructor() {
    super();

    this.state = {
      customer: {}
    };
  }

  componentDidMount() {
    api.customers.getById(this.props.match.params.id).then(customer => {
      this.setState(state => {
        return {
          customer
        };
      });
    });
  }

  removeTask = id => {
    api.tasks.remove(id).then(() => {
      api.customers.getById(this.props.match.params.id).then(customer => {
        this.setState(state => {
          return {
            open: false, //
            customer
          };
        });
      });
    });
  };

  updateTask = id => {
    this.props.history.push(`/editTask/${id}`);
  };

  render() {
    const { customer } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <Button onClick={() => this.props.history.push(`/taskboard`)} animated>
          <Button.Content visible>{"Task Board"}</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
        <br />
        <br />
        <br />

        <Card style={{ padding: 8 }} color={"teal"} key={customer.id}>
          <Card.Content style={{ padding: 8 }}>
            <Card.Header>
              <Icon name="user" /> {customer.name}
            </Card.Header>
            <Card.Meta>
              Company: {customer.company && customer.company}
            </Card.Meta>
            <Card.Meta>Type: {customer.list && customer.list}</Card.Meta>
            <br />
            <Card.Description style={{ padding: 4 }}>
              <b>
                <Icon name="mail outline" />
                {customer.email}
              </b>
            </Card.Description>

            <Card.Description style={{ padding: 4 }}>
              <b>
                <Icon name="call" />
                {customer.phone}
              </b>
            </Card.Description>

            <Card.Description style={{ padding: 4 }}>
              <b>
                <Icon name="browser" />
                <Modal
                  trigger={<Button size="mini">Narrative</Button>}
                  basic
                  size="small"
                >
                  <Header icon="browser" content="Narrative">
                    {customer.name} - Narrative
                  </Header>
                  <Modal.Content>
                    {customer.info && <p>{renderHTML(customer.info)}</p>}
                  </Modal.Content>
                </Modal>
              </b>
            </Card.Description>
          </Card.Content>
        </Card>

        <br />
        <br />
        {customer.tasks &&
          customer.tasks.map(t => (
            <Table color={"teal"} columns={7} celled>
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

              <Table.Row key={customer.id}>
                <Table.Cell collapsing>
                  <p>{t.title}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{t.dueDate}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{t.description}</p>
                </Table.Cell>
                <Table.Cell style={{ padding: 20 }} textAlign={"center"}>
                  <Button onClick={() => this.updateTask(t.id)}>
                    <Icon name="edit" />
                  </Button>

                  <Popup
                    on={"click"}
                    trigger={
                      <Button>
                        <Icon name="trash outline" />
                      </Button>
                    }
                    content={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                        <p>Delete task?</p>
                        <Button
                          negative
                          content={"Confirm"}
                          onClick={() => this.removeTask(t.id)}
                        />
                      </div>
                    }
                  />
                </Table.Cell>
              </Table.Row>
            </Table>
          ))}
      </div>
    );
  }
}

export default CreateTask;
