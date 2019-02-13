import React, { Component } from "react";
import NavRoom from "./NavRoom";
import "./NavRooms.css";

class NavRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      redirect: false
    };
  }

  _onChangeRoomName = e => {
    if (this.props.session) {
      this.setState({
        roomName: e.target.value
      });
    } else {
      alert("로그인 이후에 이용가능합니다.");
      return;
    }
  };

  _onClickAddRoom = async () => {
    if (this.props.session === null) {
      alert("로그인 이후에 이용가능합니다.");
      return;
    }

    if (this.state.roomName === "") {
      alert("방 제목을 입력해주세요.");
      return;
    }

    const room = {
      roomName: this.state.roomName,
      roomCtor: this.props.session
    };

    const res = await fetch("http://54.180.26.159:5000/rooms/room", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(room)
    });
    const result = await res.json();
    console.log(result);

    this.props._changeRooms();

    this.setState({
      roomName: ""
    });
  };

  _checkSession = () => {
    if (this.props.session === null) {
      alert("로그인 이후에 이용가능합니다.");
      return;
    }
  };

  _handleKeyPress = e => {
    if (e.charCode === 13) {
      this._onClickAddRoom();
    }
  };

  render() {
    return (
      <div className="navRoomsBox">
        <div className="navRooms">
          <div className="navRooms_title">채팅방 목록</div>
          <div className="navRooms_inner">
            {this.props.rooms.map((room, index) => {
              return (
                <NavRoom
                  session={this.props.session}
                  room={room}
                  key={index}
                  _changeComments={this.props._changeComments}
                  _changeRooms={this.props._changeRooms}
                />
              );
            })}
          </div>

          <input
            className="navRooms_input"
            placeholder="방 제목을 입력하세요."
            value={this.state.roomName}
            onChange={this._onChangeRoomName}
            onClick={this._checkSession}
            onKeyPress={this._handleKeyPress}
          />
          <div className="navRooms_addRoomBox">
            <div className="navRooms_addRoom" onClick={this._onClickAddRoom}>
              <i className="fas fa-plus-circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavRooms;
