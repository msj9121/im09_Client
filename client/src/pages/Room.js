import React, { Component } from "react";
import RoomTop from "../components/Room/RoomTop";
import RoomInner from "../components/Room/RoomInner";
import RoomInput from "../components/Room/RoomInput";
import "./Room.css";

class Room extends Component {
  render() {
    return (
      <div className="room">
        <RoomTop roomname={this.props.match.params.roomname} />
        <RoomInner
          comments={this.props.comments}
          session={this.props.session}
        />
        <RoomInput
          roomname={this.props.match.params.roomname}
          session={this.props.session}
          _changeComments={this.props._changeComments}
        />
      </div>
    );
  }
}

export default Room;
