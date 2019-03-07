import React, { Component } from 'react';
import "./RoomInner.css";
import RoomMessage from "./RoomMessage";
import RoomMyMessage from "./RoomMyMessage";

class RoomInner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  render() {
    return (
      <div className="roomInner">
        {this.props.comments.map((comment, index) => {
          if(comment.commenter === this.props.session) {
            return <RoomMyMessage comment={comment} key={index}/>
          } else {
            return <RoomMessage comment={comment} key={index}/>
          }
        })}
      </div>
    );
  }
}

export default RoomInner;