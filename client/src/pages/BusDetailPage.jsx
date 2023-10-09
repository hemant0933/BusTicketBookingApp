import { Box, Button, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BusDetailPage = () => {
  const { busId } = useParams(); // Get the bus ID from the URL
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [busData, setBusData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bus details by busId from your API
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bus/${busId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.bus); // Check the structure of the returned data
        setBusData(data.bus); // Set bus data to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, [busId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative">
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
            <h2 className="text-4xl mb-4">Bus Detail Page</h2>
            <Box>
              {
                busData.map((item) => (
                  <div key={item.busId} className="w-[800px] h-auto rounded-md overflow-hidden shadow-md hover:shadow-lg bg-white hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
                  >

                    <div className="p-4">
                    <h2 className="text-xl font-semibold">{item.busName}</h2>
                    <p className="text-gray-600 w-full flex justify-between items-center">
                      <strong>From</strong>{item.source}  <strong>To</strong>
                      {item.destination}
                    </p>
                    <p>Arrival Time: {item.arrivalTime}</p>
                    <p>Departure Time: {item.departureTime}</p>
                    <p>Price: Starting from Rs. 1200</p>
                    <p>Seats Available: 12</p>
                    <Box className="w-full flex justify-end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate('/book-ticket')
                      }}
                    >
                      View Seats
                    </Button>
                    </Box>
                  </div>
                  </div>
                ))
              }
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default BusDetailPage;
