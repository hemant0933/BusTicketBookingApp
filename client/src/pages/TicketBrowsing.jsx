import { useState } from "react";
import Navbar from "../components/commonComponents/Navbar";
import svg from "../assets/banner2.jpg";
import { Link } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

const TicketBrowsing = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      let apiUrl = `https://busbackend-muqx.onrender.com/bus/search_buses?source=${source}&destination=${destination}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const retrievedBuses = data.buses;
      setBuses(retrievedBuses);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error("Error searching for buses:", error);
      setError("Error searching for buses. Please try again later.");
      setBuses([]); // Clear the buses array
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      <div className="relative">
        <Navbar />
      </div>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <div className="w-full h-full flex justify-center items-center absolute overflow-hidden top-20 -z-10 left-0 right-0 ">
          <img src={svg} className="w-[70%] object-cover" alt="svg" />
        </div>
        <form
          onSubmit={handleSubmit}
          className={`h-auto mt-24 p-4 border-2 border-gray-300 rounded-md ${
            isNonMobileScreens
              ? "w-auto flex justify-between items-center gap-4"
              : "w-[80%] grid grid-rows-4 grid-cols-1 gap-4"
          } bg-white`}
        >
          <input
            type="text"
            placeholder="Source"
            className="col-span-3 row-span-2 py-4 px-8 rounded-md focus:outline-slate-200 outline-none bg-gray-100"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            className="col-span-3 row-span-2 py-4 px-8 rounded-md focus:outline-slate-200 outline-none bg-gray-100"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date"
            className="col-span-3 row-span-2 py-4 px-8 rounded-md focus:outline-slate-200 outline-none bg-gray-100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            type="submit"
            className={`${
              isNonMobileScreens ? "col-span-4" : "row-span-4"
            } py-4 px-12 rounded-md bg-red-400 hover:bg-red-500`}
          >
            SEARCH
          </button>
        </form>

        {/* Display the retrieved buses as cards */}
        <div className="pt-8">
          <div
            className="bg-white shadow-md p-2 rounded-lg"
            style={{
              wordSpacing: "0.5rem",
              fontSize: "1rem",
            }}
          >
            Right now only these route are available Delhi-Mumbai,
            Mumabi-Bangalore, Bangalore-Chennai, Chennai-Hyderabad,
            Hyderabad-Kolkata, Kolkata-Jaipur, Jaipur-Ahmedabad.
          </div>
          {buses.length > 0 && (
            <div
              className={`grid place-items-center mt-4 ${
                isNonMobileScreens ? "grid-cols-1" : "grid-rows-2"
              } gap-4`}
            >
              {buses.map((bus) => (
                <Link
                  key={bus.busId}
                  to={`/${bus.busId}`} // Replace with the actual route you want to navigate to
                  className="w-full h-auto rounded-md overflow-hidden shadow-md hover:shadow-lg bg-white hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
                  style={{ maxWidth: isNonMobileScreens ? "70%" : "700px" }}
                >
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{bus.busName}</h2>
                    <p className="text-gray-600">
                      <strong> From</strong>: {bus.source} - <strong>To</strong>
                      : {bus.destination}
                    </p>
                    <p>Arrival Time: {bus.arrivalTime}</p>
                    <p>Departure Time: {bus.departureTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {error && <p>{error}</p>}
        </div>
      </Box>
    </>
  );
};

export default TicketBrowsing;
