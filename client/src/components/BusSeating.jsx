import React from "react";
import Seat from "./Seat";

const BusSeating = ({ seatingData, onSelect, rowIndex }) => {
  return (
    <div className="bus-seating">
      <div className="border-red-600 border">
        Row {rowIndex + 1}
      </div>
      <div className="seat-row">
        {seatingData && seatingData.map((seat, seatIndex) => (
          <Seat
            key={seatIndex}
            seatData={seat}
            onSelect={() => onSelect(rowIndex, seatIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default BusSeating;
