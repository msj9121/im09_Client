import React from "react";
import "./RoomTop.css";

const RoomTop = ({ roomname }) => {
  return (
    <div className="roomTopBox">
      <div className="roomTop">{roomname}</div>
    </div>
  );
};

export default RoomTop;
