import React, { Component } from 'react';
import "./RoomMyMessage.css";

class RoomMyMessage extends Component {
  render() {
    return (
      <div className="roomMyMessageBox">
        <div className="roomMyMessage">
          {this.props.comment.comment}
        </div>
      </div>
    );
  }
}

export default RoomMyMessage;