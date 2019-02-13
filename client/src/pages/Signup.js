import React, { Component } from "react";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      PW: "",
      againPW: ""
    };
  }

  _onChangeUserId = e => {
    this.setState({
      userId: e.target.value
    });
  };

  _onChangePW = e => {
    this.setState({
      PW: e.target.value
    });
  };

  _onChangeAgainPW = e => {
    this.setState({
      againPW: e.target.value
    });
  };

  _onClickSignup = async () => {
    const userId = this.state.userId;
    const PW = this.state.PW;
    const againPW = this.state.againPW;

    if (userId === "" || PW === "" || againPW === "") {
      alert("정보를 입력하세요.");
      return;
    }

    if (PW !== againPW) {
      alert("비밀번호가 일치하지 않습니다.");
      this.setState({
        PW: "",
        againPW: ""
      });
      return;
    } else {
      const user = {
        userId: userId,
        password: PW
      };

      const res = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const result = await res.json();

      if (result) {
        alert("회원가입 되었습니다.");
        this.props.history.push("/login");
      } else {
        alert("이미 회원이 있습니다.");
        this.setState({
          userId: "",
          PW: "",
          againPW: ""
        });
      }
    }
  };

  _handleKeyPress = e => {
    if (e.charCode === 13) {
      this._onClickSignup();
    }
  };

  render() {
    return (
      <div id="signup">
        <div className="signupContainer">
          <div className="signup_logo">회원가입</div>

          <div className="signup_container">
            <div className="signup_box">
              {/* <input className="signup_box_input" type="text" placeholder="URL" /> */}
              <input
                className="signup_box_input"
                type="text"
                placeholder="아이디를 입력하세요."
                value={this.state.userId}
                onChange={this._onChangeUserId}
                onKeyPress={this._handleKeyPress}
              />
              <input
                className="signup_box_input"
                type="password"
                placeholder="비밀번호를 입력하세요(8~20자)"
                value={this.state.PW}
                onChange={this._onChangePW}
                onKeyPress={this._handleKeyPress}
              />
              <input
                className="signup_box_input"
                type="password"
                placeholder="비밀번호를 한번 더 입력하세요."
                value={this.state.againPW}
                onChange={this._onChangeAgainPW}
                onKeyPress={this._handleKeyPress}
              />

              <div className="signup_box_button" onClick={this._onClickSignup}>
                회원가입
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
