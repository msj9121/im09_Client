import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./NavRoom.css";

class NavRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }
  _changeComments = () => {
    const roomName = this.props.room.roomName;
    this.props._changeComments(roomName);
  };

  _deleteRoom = async () => {
    const room = {
      roomName: this.props.room.roomName,
      roomCtor: this.props.room.roomCtor
    };
    const res = await fetch(`http://54.180.26.159:5000/rooms/room`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(room)
    });
    const result = await res.json();
    console.log("deleteRoom", result);
    this.props._changeRooms();
    this.setState({
      redirect: true
    });
  };

  render() {
    return (
      <div className="navRoomContainer">
        <div className="navRoomBox" onClick={this._changeComments}>
          <Link className="navRoom" to={`/room/${this.props.room.roomName}`}>
            <div className="box">
              <div className="box-open">
                <i className="fas fa-box-open" />
              </div>
              <div className="navRoomName">{this.props.room.roomName}</div>
            </div>
          </Link>
        </div>
        {this.props.session === this.props.room.roomCtor ? (
          <div>
            {this.state.redirect ? <Redirect to="/" /> : <div />}
            <div className="navRoomXbox" onClick={this._deleteRoom}>
              X
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default NavRoom;
