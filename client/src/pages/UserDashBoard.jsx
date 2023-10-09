import { useSelector } from "react-redux";
import Navbar from "../components/commonComponents/Navbar";
import { Box, useMediaQuery } from "@mui/material";

const UserDashBoard = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user)
  // console.log(user)

  return (
    <Box className="w-full h-screen relative">
      <Navbar />
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        className=""
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{
          mt: "10rem",
        }}
        position="relative"
      >
        <h1 className="font-normal text-xl text-blue-500 text-left">My Profile</h1>
        <Box className="border-2 w-[90%] h-auto p-8 border-gray-200 bg-gray-50 mt-8 rounded-md">
          <p className="capitalize"><span className="font-bold">Your Name:</span> {user.username}</p> 
          <p className="capitalize"><span className="font-bold">Email:</span> {user.email}</p> 
          <p className="capitalize"><span className="font-bold">UserId:</span> {user._id}</p> 
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashBoard;
