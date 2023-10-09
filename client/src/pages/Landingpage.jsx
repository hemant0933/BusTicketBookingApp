import LoginPage from "./LoginPage/Login";

import banner from "../assets/banner.jpeg";
// import Navbar from "../components/commonComponents/Navbar";

const Landingpage = () => {
  return (
    <div className="w-full h-full relative">
      <div className="flex items-center justify-center">
        <div className="w-full h-full absolute -z-10 top-0 left-0 right-0">
          <img
            src={banner}
            className="w-full h-screen object-cover"
            alt="bannerImage"
          />
        </div>
        <div className="mt-2">
          <LoginPage />
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
