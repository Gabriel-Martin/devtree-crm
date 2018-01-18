import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

class MainPage extends Component {
  render() {
    return (
      <div
        style={{
          padding: 20
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>Dashboard</h1>
          </div>
          <div>
            <Button
              floated="right"
              onClick={() => this.props.history.push(`/signup`)}
              animated="fade"
            >
              <Button.Content visible>{"Add User"}</Button.Content>
              <Button.Content hidden>
                <Icon name="user" />
              </Button.Content>
            </Button>
            <Button
              floated="right"
              onClick={() =>
                localStorage.removeItem("token") ||
                this.props.history.push(`/login`)}
              animated="fade"
            >
              <Button.Content visible>{"Logout"}</Button.Content>
              <Button.Content hidden>
                <Icon name="window close outline" />
              </Button.Content>
            </Button>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div style={{ textAlign: "center", width: 300, margin: "auto" }}>
          <img
            style={{ width: 240 }}
            src="https://static1.squarespace.com/static/58912ff81e5b6cdc60f66742/t/58af21d06b8f5b80338b9cbb/1487871938950/tasks.png"
            alt="pic"
          />
          <br />
          <br />
          <br />
          <Button
            basic
            color={"teal"}
            fluid
            size="massive"
            onClick={() => this.props.history.push(`/taskboard`)}
          >
            Task Board
          </Button>

          <br />
          <br />
          <Button
            basic
            color={"teal"}
            fluid
            size="massive"
            onClick={() => this.props.history.push(`/prospects`)}
          >
            Prospects
          </Button>
          <br />
          <br />
          <Button
            basic
            color={"teal"}
            fluid
            size="massive"
            onClick={() => this.props.history.push(`/partners`)}
          >
            Partners
          </Button>
        </div>
      </div>
    );
  }
}

// https://static1.squarespace.com/static/58912ff81e5b6cdc60f66742/t/58af21d06b8f5b80338b9cbb/1487871938950/tasks.png

export default MainPage;
