import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import './style.css';

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
 
  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        className="glass"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{
          mt:'4rem'
        }}
        position="relative"
      >
        <Typography fontWeight="500" varient="h5" sx={{ pb: "1.5rem" }}>
         Book your journey now with the world's largest bus platform
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
