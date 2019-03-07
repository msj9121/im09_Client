import React, { Component } from 'react';
import "./RoomMessage.css";

class RoomMessage extends Component {
  render() {
    return (
      <div className="roomMessageBox">
        <div className="roomMessageUser">
          {this.props.comment.commenter}
        </div>
        <div className="roomMessage">
          {this.props.comment.comment}
        </div>
      </div>
    );
  }
}

export default RoomMessage;