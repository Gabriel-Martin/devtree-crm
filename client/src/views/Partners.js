import React, { Component } from "react";
import api from "../api";
import {
  Button,
  Modal,
  Table,
  Header,
  Rating,
  Popup,
  Icon,
  Dropdown,
  Confirm,
  Segment
} from "semantic-ui-react";
import renderHTML from "react-render-html";

class Partners extends Component {
  constructor() {
    super();

    this.state = {
      partnerType: "All",
      open: false,
      allPartners: [],
      partners: [],
      error: false
    };
  }

  getPartners = () => {
    api.customers.getAll().then(customers => {
      if (!customers.length && customers.length !== 0) {
        console.log("Return value was not an Array of Customers", customers);
        customers = [];

        this.setState(state => {
          return {
            error: "Unable to fetch customers"
          };
        });
      }
      this.setState(state => {
        return {
          allPartners: customers.filter(c => c.type === "partner"),
          partners: customers.filter(c => c.type === "partner")
        };
      });
    });
  };

  componentDidMount() {
    this.getPartners();
  }

  removePartner = id => {
    api.customers.remove(id).then(() => {
      api.customers.getAll().then(customers => {
        if (!customers.length && customers.length !== 0) {
          console.log("Return value was not an Array of Customers", customers);
          customers = [];

          this.setState(state => {
            return {
              error: "Unable to fetch customers"
            };
          });
        }
        this.setState(state => {
          return {
            open: false,
            allPartners: customers.filter(c => c.type === "partner"),
            partners: customers.filter(c => c.type === "partner")
          };
        });
      });
    });
  };

  updatePartner = id => {
    this.props.history.push(`/editCustomer/${id}`);
  };

  onSelectChange = (selectEvent, { value }) => {
    const { allPartners } = this.state;

    if (value === "business" || value === "student") {
      let filteredPartners = allPartners.filter(
        partner => partner.list === value
      );

      this.setState(state => ({
        ...state,
        partners: filteredPartners,
        partnerType: value === "business" ? "Business" : "Student"
      }));
    } else if (value === "other") {
      let filteredPartners = allPartners.filter(
        partner => partner.list === value
      );

      this.setState(state => ({
        ...state,
        partners: filteredPartners,
        partnerType: "Other"
      }));
    } else {
      this.setState(state => ({
        ...state,
        partners: allPartners,
        partnerType: "All"
      }));
    }
  };

  render() {
    let { partners, error, partnerType } = this.state;

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
        <Segment
          color={"teal"}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <h1> {partnerType} Partners</h1>

          <div>
            <Dropdown
              selection
              placeholder="Select Prospect Type"
              options={[
                { key: "business", value: "business", text: "Business" },
                { key: "student", value: "student", text: "Student" },
                { key: "other", value: "other", text: "Other" },
                { key: "all", value: "all", text: "All" }
              ]}
              onChange={this.onSelectChange}
            />
          </div>

          <div>
            <Button onClick={() => this.props.history.push(`/create/partner`)}>
              Add Partner
            </Button>
          </div>
        </Segment>

        <br />
        {error && <div>{error}</div>}
        <Table color={"teal"} columns={7} celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <b>
                  <u>NAME</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>
                  <u>COMPANY</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>
                  <u>EMAIL</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>
                  <u>PHONE</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>
                  <u>SITE</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign={"center"}>
                <b>
                  <u>Narrative</u>
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign={"center"}>
                <b>
                  <u>EDIT / DELETE</u>
                </b>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {partners.map(c => (
            <Table.Row key={c.id}>
              <Table.Cell collapsing>
                <p>{c.name}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{c.company}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{c.email}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{c.phone}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{c.site}</p>
              </Table.Cell>
              <Table.Cell style={{ padding: 20 }} textAlign={"center"}>
                <Modal
                  trigger={
                    <Button>
                      <Icon name="browser" />
                    </Button>
                  }
                  basic
                  size="small"
                >
                  <Header icon="browser" content="Narrative">
                    {c.name} - Narrative
                  </Header>
                  <Modal.Content>
                    <p>{renderHTML(c.info)}</p>
                  </Modal.Content>
                </Modal>
              </Table.Cell>
              <Table.Cell style={{ padding: 20 }} textAlign={"center"}>
                <Button onClick={() => this.updatePartner(c.id)}>
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
                      <p>Delete Prospect?</p>
                      <Button
                        negative
                        content={"Confirm"}
                        onClick={() => this.removePartner(c.id)}
                      />
                    </div>
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </div>
    );
  }
}

export default Partners;
