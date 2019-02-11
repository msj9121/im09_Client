import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./Main.css";
import Index from "../pages/Index";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Room from "../pages/Room";

class Main extends Component {
  render() {
    return (
      <div id="main">
        <Route exact path="/" component={Index} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} _login={this.props._login} />}
        />
        <Route
          path="/room/:roomname"
          render={props => (
            <Room
              {...props}
              comments={this.props.comments}
              session={this.props.session}
              _changeComments={this.props._changeComments}
            />
          )}
        />
      </div>
    );
  }
}

export default Main;
