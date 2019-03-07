import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import NavRooms from "./NavRooms";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
          rooms={this.props.rooms}
          _changeRooms={this.props._changeRooms}
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
