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
      rooms: [],
      comments: []
    };
  }

  async componentDidMount() {
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

    const res = await fetch("http://54.180.26.159:5000/rooms");
    const rooms = await res.json();
    this.setState({
      rooms: this.state.rooms.concat(rooms)
    });

    //------------웹소켓 연결---------------//
    const webSocket = new WebSocket("ws://54.180.26.159:5000/");
    webSocket.onopen = () => {
      console.log("서버와 웹소켓 연결 성공!");
    };
    webSocket.onmessage = event => {
      console.log("1", JSON.parse(event.data));
      const res = JSON.parse(event.data);
      const rooms = res.rooms;
      console.log("rooms", rooms);
      this.setState({
        rooms: rooms
      });
    };
    this.setState({
      webSocket: webSocket
    });
  }

  _changeRooms = async () => {
    const res = await fetch("http://54.180.26.159:5000/rooms");
    const rooms = await res.json();
    this.setState({
      rooms: rooms
    });

    const scrollBottom =
      document.getElementById("navRooms_inner").scrollHeight -
      document.getElementById("navRooms_inner").clientHeight;
    document.getElementById("navRooms_inner").scrollTop = scrollBottom;
  };

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

    this.setState({
      comments: comments
    });

    this._scrollBottom();

    this.state.webSocket.onmessage = event => {
      this.state.webSocket.send(roomName);
      console.log("2", roomName, JSON.parse(event.data));
      const res = JSON.parse(event.data);
      const comments = res.comments;
      console.log("comments", comments);
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
                rooms={this.state.rooms}
                _changeRooms={this._changeRooms}
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
                session={this.state.session}
                _login={this._login}
                comments={this.state.comments}
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
