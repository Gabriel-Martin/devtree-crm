import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./views/Login";
import MainPage from "./views/MainPage";
import TaskBoard from "./views/TaskBoard";
import Partners from "./views/Partners";
import Prospects from "./views/Prospects";
import Profile from "./views/Profile";
import Signup from "./views/Signup";
import CreateTask from "./views/CreateTask";
import EditTask from "./views/EditTask";
import EditCustomer from "./views/EditCustomer";
import CreateCustomer from "./views/CreateCustomer";
import CustomerDetails from "./views/CustomerDetails";

import AuthenticatedRoute from "./containers/AuthenticatedRoute";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div
          style={{
            height: "100vh",
            backgroundColor: "rgb(242,242,242) "
          }}
        >
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <AuthenticatedRoute exact path={"/"} component={MainPage} />
            <AuthenticatedRoute
              exact
              path={"/taskboard"}
              component={TaskBoard}
            />
            <AuthenticatedRoute
              exact
              path={"/create/:type"}
              component={CreateCustomer}
            />
            <AuthenticatedRoute
              exact
              path={"/partners/:id"}
              component={CustomerDetails}
            />
            <AuthenticatedRoute
              exact
              path={"/prospects/:id"}
              component={CustomerDetails}
            />
            <AuthenticatedRoute exact path={"/partners"} component={Partners} />
            <AuthenticatedRoute
              exact
              path={"/editCustomer/:id"}
              component={EditCustomer}
            />
            <AuthenticatedRoute
              exact
              path={"/prospects"}
              component={Prospects}
            />

            <AuthenticatedRoute exact path={"/signup"} component={Signup} />
            <AuthenticatedRoute
              exact
              path={"/editTask/:id"}
              component={EditTask}
            />

            <AuthenticatedRoute
              exact
              path={"/create-task"}
              component={CreateTask}
            />
            <AuthenticatedRoute
              exact
              path={"/profile/{id}"}
              component={Profile}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
