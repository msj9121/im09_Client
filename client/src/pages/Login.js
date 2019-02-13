import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: ""
    };
  }

  _onChangeUserId = e => {
    this.setState({
      userId: e.target.value
    });
  };

  _onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  _onClickLogin = async () => {
    const user = {
      userId: this.state.userId,
      password: this.state.password
    };

    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const result = await res.json();

    if (result) {
      alert("로그인 되었습니다.");
      this.props._login(result);
      this.props.history.push("/");
    } else {
      alert("회원정보가 일치하지 않습니다.");
      this.setState({
        userId: "",
        password: ""
      });
    }
  };

  _handleKeyPress = e => {
    if (e.charCode === 13) {
      this._onClickLogin();
    }
  };

  render() {
    return (
      <div id="login">
        <div className="loginContainer">
          <div className="login_logo">로그인</div>

          <div className="login_box">
            <input
              className="login_input_name"
              type="text"
              placeholder="아이디"
              value={this.state.userId}
              onChange={this._onChangeUserId}
              onKeyPress={this._handleKeyPress}
            />
            <input
              className="login_input_name"
              type="password"
              placeholder="비밀번호"
              value={this.state.password}
              onChange={this._onChangePassword}
              onKeyPress={this._handleKeyPress}
            />

            <div className="login_input_button" onClick={this._onClickLogin}>
              로그인
            </div>
            <div className="login_button">
              <div>아직 채터박스 회원이 아니신가요?</div>
              <Link to="/signup">회원가입</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
