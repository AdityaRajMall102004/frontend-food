import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);

const handleSignup = () => {
  window.location.href = `${process.env.REACT_APP_BACKEND_URL}signup`;
};

const handleLogin = () => {
  window.location.href = `${process.env.REACT_APP_BACKEND_URL}login`;
};
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-md pr-1 sm:pr-4 md:pr-5 bg-green-50">
        <a href="/">
          <img
            id="logo"
            className="w-16 sm:w-20 md:w-24 rounded-md"
            src={LOGO_URL}
          />
        </a>
        <h1 className="flex font-bold h-20 items-center px-2 text-sm sm:text-xl md:text-2xl text-gray-700">
          Hunger End's Here...
        </h1>
        <ul className="flex text-sm md:text-lg h-20 items-center text-gray-700 font-semibold">
          <li className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg">
            <Link to="/">Home</Link>
          </li>
          <li className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg">
            <Link to="/about">About</Link>
          </li>
          <li
            className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg cursor-pointer"
            onClick={handleSignup}
          >
            Sign Up
          </li>

          <li
            className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </li>

          <li className="px-1 md:px-4 flex">
            <Link className="text-2xl" to="/cart">
              🛒
            </Link>
            <h1 className="text-sm font-semibold bg-green-600 flex items-center justify-center h-5 w-5 p-1 -m-2 rounded-full text-white">
              {cartItems.length}
            </h1>
          </li>
        </ul>
      </div>
      <div className="pt-20"></div>
    </>
  );
};

export default Header;

