import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "./commonComponents/Navbar";
import { v4 as uuidv4 } from "uuid";

const BookTicket = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [row1, setRow1] = useState([
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: false, selected: false },
  ]);
  const [row2, setRow2] = useState([
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: false },
  ]);
  const [row3, setRow3] = useState([
    { seatId: uuidv4(), empty: false, selected: false },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: true },
    { seatId: uuidv4(), empty: true, selected: false },
    { seatId: uuidv4(), empty: false, selected: false },
  ]);

  const toggleSelected = (row, seatId) => {
    const updatedSeats = [...row];
    const seatIndex = updatedSeats.findIndex((seat) => seat.seatId === seatId);
    if (seatIndex !== -1 && !updatedSeats[seatIndex].empty) return; // Do not toggle if seat is reserved
    updatedSeats[seatIndex].selected = !updatedSeats[seatIndex].selected;
    // Update the correct state variable based on the row
    switch (row) {
      case row1:
        setRow1(updatedSeats);
        break;
      case row2:
        setRow2(updatedSeats);
        break;
      case row3:
        setRow3(updatedSeats);
        break;
      default:
        break;
    }

     // Get the seat price (assuming all selected seats have a price of 1400 rupees)
     const seatPrice = 1400;

     // Call a callback function to handle the selected seat and price
     handleSeatSelection(seatId, seatPrice);
  };


  const handleSeatSelection = (seatId, seatPrice) => {
    // You can do whatever you want with the seatId and seatPrice here
    console.log(`Selected seat: ${seatId}, Price: ${seatPrice} rupees`);
    
  };

  return (
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{
          mt: "4rem",
          textAlign: "center",
        }}
        position="relative"
      >
         <Navbar />
        <Typography fontWeight="500" varient="h5" sx={{ pb: "1.5rem" }}>
          2D Bus Booking Layout
        </Typography>

        <Box className="flex items-center justify-center gap-4 ">
          <Box className="w-[160px] flex items-center justify-center gap-4">
            <span className="w-6 h-6 bg-yellow-400 border-2 border-gray-500"></span>
            <p>Unreserved Seats</p>
          </Box>
          <Box className="w-[160px] flex items-center justify-center gap-4">
            <span className="w-6 h-6 bg-green-300"></span>
            <p>Reserved Seats</p>
          </Box>
        </Box>

        <Box className="w-[400px] h-[500px] rounded-lg p-2 flex bg-slate-100 flex-col justify-center">
          <Box className="flex justify-between">
            {/* row 1 */}
            <Box className="parent">
              {row1.map((seat) => {
                return (
                  <div
                    key={seat.seatId} // Make sure to include a unique key for each element in the map
                    className={`w-6 h-6 cursor-pointer ${
                      seat.empty
                        ? seat.selected
                          ? "bg-blue-300" // Unreserved and selected
                          : "bg-yellow-400 border-2 border-gray-500" // Unreserved and not selected
                        : "bg-green-300 cursor-no-drop" // Reserved (regardless of selected state)
                    }`}
                    onClick={() => toggleSelected(row1, seat.seatId)}
                  ></div>
                );
              })}
            </Box>
            {/* row 2 */}
            <Box className="parent">
              {row2.map((seat) => {
                return (
                  <div
                    key={seat.seatId} // Make sure to include a unique key for each element in the map
                    className={`w-6 h-6 cursor-pointer ${
                      seat.empty
                        ? seat.selected
                          ? "bg-blue-300" // Unreserved and selected
                          : "bg-yellow-400 border-2 border-gray-500" // Unreserved and not selected
                        : "bg-green-300 cursor-no-drop" // Reserved (regardless of selected state)
                    }`}
                    onClick={() => toggleSelected(row2, seat.seatId)}
                  ></div>
                );
              })}
            </Box>
          </Box>
          {/* row 3 */}
          <Box className="parent2 px-2 py-2">
            {row3.map((seat) => {
              return (
                <div
                  key={seat.seatId} // Make sure to include a unique key for each element in the map
                  className={`w-6 h-6 cursor-pointer ${
                    seat.empty
                      ? seat.selected
                        ? "bg-blue-300" // Unreserved and selected
                        : "bg-yellow-400 border-2 border-gray-500" // Unreserved and not selected
                      : "bg-green-300 cursor-no-drop" // Reserved (regardless of selected state)
                  }`}
                  onClick={() => toggleSelected(row3, seat.seatId)}
                ></div>
              );
            })}
          </Box>
        </Box>
      </Box>
  );
};

export default BookTicket;
