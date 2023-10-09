import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  // console.log(user)
  return (
    <div className="w-full fixed top-0 left-0 right-0  glass2 py-4 px-8">
      <div className="w-full flex items-center justify-between">
       <Link  to='/browse-tickets'>
        <p className="font-semibold text-3xl text-black">
            BusAdda<span className="text-white">.com</span>
        </p>
       </Link>
        <div className="w-[400px] flex items-center justify-around text-black">
          <Link
            to="/browse-tickets"
            className="font-medium text-base hover:bg-red-500 rounded-full py-2 px-4"
          >
            Home
          </Link>
          <Link
            to="/book-ticket"
            className="font-medium text-base hover:bg-red-500 rounded-full py-2 px-4"
          >
            Booking
          </Link>
          <Link
            to="/userProfile"
            className="font-medium text-base hover:bg-red-500 rounded-full py-2 px-4"
          >
            Profile
          </Link>
          <button
            onClick={() => dispatch(setLogout())}
            className="font-medium text-base hover:bg-red-500 rounded-full py-2 px-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
