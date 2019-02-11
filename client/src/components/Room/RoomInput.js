import React, { Component } from "react";
import "./RoomInput.css";

class RoomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  _onChangeText = e => {
    if (this.props.session) {
      this.setState({
        text: e.target.value
      });
    } else {
      alert("로그인 이후에 이용가능합니다.");
      return;
    }
  };

  _onClickSend = async () => {
    if (this.props.session === null) {
      alert("로그인 이후에 이용가능합니다.");
      return;
    }

    if (this.state.text === "") {
      alert("메시지를 입력해주세요.");
      return;
    }

    if (this.props.session && this.state.text.length) {
      const comment = {
        comment: this.state.text,
        commenter: this.props.session,
        roomName: this.props.roomname
      };
      const res = await fetch("http://localhost:5000/comments/comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      });
      const result = res.json();

      if (result) {
        console.log("send 성공");
        this.props._changeComments(this.props.roomname);
        this.setState({
          text: ""
        })
      } else {
        console.log("send 실패");
      }
    }
  };

  _checkSession = () => {
    if (this.props.session === null) {
      alert("로그인 이후에 이용가능합니다.");
      return;
    }
  };

  _handleKeyPress = e => {
    if (e.charCode === 13) {
      this._onClickSend();
    }
  };

  render() {
    return (
      <div className="roomInputBox">
        <input
          className="roomInput"
          value={this.state.text}
          onChange={this._onChangeText}
          onClick={this._checkSession}
          onKeyPress={this._handleKeyPress}
        />
        <div className="roomInputSend" onClick={this._onClickSend}>
          <i className="fas fa-paper-plane" />
        </div>
      </div>
    );
  }
}

export default RoomInput;
