import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Splash from "./components/Splash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: true,
      session: null,
      comments: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        splash: false
      });
    }, 3000);

    if (sessionStorage.getItem("userId")) {
      this.setState({
        session: sessionStorage.getItem("userId")
      });
    }

    const webSocket = new WebSocket("ws://54.180.26.159:5000/");
    webSocket.onopen = () => {
      console.log("서버와 웹소켓 연결 성공!");
    };
    this.setState({
      webSocket: webSocket
    });
  }

  _login = result => {
    sessionStorage.setItem("userId", result);
    this.setState({
      session: result
    });
  };

  _logout = () => {
    sessionStorage.removeItem("userId");
    this.setState({
      session: null
    });
  };

  _changeComments = async roomName => {
    const res = await fetch(`http://54.180.26.159:5000/comments?room=${roomName}`);
    const comments = await res.json();
    console.log(comments);
    this.setState({
      comments: comments
    });

    this._scrollBottom();

    this.state.webSocket.onmessage = event => {
      this.state.webSocket.send(roomName);
      console.log(roomName);
      console.log(JSON.parse(event.data));

      const comments = JSON.parse(event.data);
      let result = false;

      if (this.state.comments.length < comments.length) {
        result = true;
      }

      if (comments.length && roomName === comments[0].roomName) {
        this.setState({
          comments: comments
        });

        if (result) {
          this._scrollBottom();
          result = false;
        }
      }
    };
  };

  _scrollBottom = () => {
    const scrollBottom =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    document.documentElement.scrollTop = scrollBottom;
  };

  _onClickShowNav = () => {
    document.getElementById("Nav").style.visibility = "visible";
  };

  render() {
    return (
      <Router>
        <div id="App">
          {this.state.splash ? (
            <Splash />
          ) : (
            <React.Fragment>
              <Nav
                session={this.state.session}
                _logout={this._logout}
                _changeComments={this._changeComments}
              />
              <div id="header">
                <div className="headerBox">
                  <div className="headerLogoBox">
                    <Link to="/" className="headerLogo">
                      <i className="fas fa-box-open" />
                    </Link>
                  </div>

                  <div className="headerBtn" onClick={this._onClickShowNav}>
                    <i className="fas fa-align-justify" />
                  </div>
                </div>
              </div>
              <Main
                _login={this._login}
                comments={this.state.comments}
                session={this.state.session}
                _changeComments={this._changeComments}
              />
            </React.Fragment>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
