import React, { useState } from "react";

const Seat = ({ key, seatData, onSelect }) => {
  const {empty, selected} = seatData;

  const seatClassName = `seat ${selected ? "selected" : empty ? "available" : "reserved"}`;

  const handleClick = () => {
    if(empty){
      onSelect();
    }
  }
  return (
    <div className={seatClassName} onClick={handleClick}>
      {key}
    </div>
  );
};

export default Seat;
