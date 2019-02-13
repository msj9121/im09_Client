import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import NavRooms from "./NavRooms";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  async componentDidMount() {
    const res = await fetch("http://54.180.26.159:5000/rooms");
    const rooms = await res.json();
    this.setState({
      rooms: this.state.rooms.concat(rooms)
    });
  }

  _changeRooms = async () => {
    const res = await fetch("http://54.180.26.159:5000/rooms");
    const rooms = await res.json();
    this.setState({
      rooms: rooms
    });
  };

  _onClickGoOut = () => {
    document.getElementById("Nav").style.visibility="hidden";
  }

  render() {
    return (
      <div id="Nav">
        <div className="navLogoBox">
          <Link to="/" className="navLogo">
            <div>
              <div>chatterBox</div>
              <div className="navLogo_box">
                <i className="fas fa-box-open fa-2x" />
              </div>
            </div>
          </Link>
        </div>

        {this.props.session ? (
          <div className="navLogoutBox">
            <div className="navUser">{this.props.session}</div>
            <div className="navLogout" onClick={this.props._logout}>
              로그아웃
            </div>
          </div>
        ) : (
          <div className="navLoginBox">
            <Link to="/login" className="navLogin">
              로그인
            </Link>
          </div>
        )}

        <NavRooms
          session={this.props.session}
          rooms={this.state.rooms}
          _changeRooms={this._changeRooms}
          _changeComments={this.props._changeComments}
        />

        <div className="goOut">
          <div className="goOutBtn" onClick={this._onClickGoOut}>
            <i className="fas fa-sign-out-alt" />
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
