import React, { Component } from "react";
import "./Index.css";

class Index extends Component {
  render() {
    return (
      <div id="index">
        <div className="indexContainer">
          <div className="indexBox">
            <div className="indexTitle">chatterBox</div>
            <div className="indexIcon"><i className="fas fa-box-open fa-2x" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
