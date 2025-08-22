import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus"; // Assuming you have this custom hook

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [user, setUser] = useState(null);
  
  // ✅ MODIFICATION 1: Added loading state to prevent UI flicker
  const [isLoading, setIsLoading] = useState(true);

  // ✅ MODIFICATION 2: Added online status check
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    const checkAuth = async () => {
      // ✅ MODIFICATION 3: Added a try...catch block for robust error handling
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}api/session`,
          {
            credentials: "include", // This is VITAL for sending the session cookie
          }
        );

        if (!res.ok) {
          // If response is not ok (e.g., 404, 500), treat as logged out
          setUser(null);
          return; // No need to proceed further
        }

        const data = await res.json();
        if (data.loggedIn) {
          setUser({ username: data.username });
        } else {
          setUser(null);
        }
      } catch (error) {
        // This will catch network errors (e.g., backend is down)
        console.error("Authentication check failed:", error);
        setUser(null); // Assume logged out if we can't reach the server
      } finally {
        // This runs regardless of success or failure
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []); // Empty dependency array means this runs once on component mount

  const handleSignup = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}signup`;
  };

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}login`;
  };

  const handleLogout = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${process.env.REACT_APP_BACKEND_URL}logout`;
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-md pr-1 sm:pr-4 md:pr-5 bg-green-50">
        <a href="/"><img id="logo" className="w-16 sm:w-20 md:w-24 rounded-md" src={LOGO_URL} alt="Logo"/></a>
        <h1 className="flex font-bold h-20 items-center px-2 text-sm sm:text-xl md:text-2xl text-gray-700">Food Point...</h1>

        <ul className="flex text-sm md:text-lg h-20 items-center text-gray-700 font-semibold">
          <li className="flex items-center px-1 md:px-4">
            Online: {onlineStatus ? "🟢" : "🔴"}
          </li>
          <li className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg"><Link to="/">Home</Link></li>
          <li className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg"><Link to="/about">About</Link></li>

          {/* Conditional Rendering Logic with Loading State */}
          {isLoading ? (
            // While loading, show a placeholder or nothing to prevent flicker
            <li className="flex px-1 md:px-4 h-8 bg-gray-200 rounded-lg animate-pulse w-32"></li>
          ) : user ? (
            <>
              <li className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg"><Link to="/profile">👤 {user.username}</Link></li>
              <li className="flex px-1 md:px-4 hover:bg-red-300 rounded-lg cursor-pointer" onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <>
              <li className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg cursor-pointer" onClick={handleSignup}>Sign Up</li>
              <li className="flex px-1 md:px-4 hover:bg-green-300 rounded-lg cursor-pointer" onClick={handleLogin}>Login</li>
            </>
          )}

          <li className="px-1 md:px-4 flex">
            <Link className="text-2xl" to="/cart">🛒</Link>
            <h1 className="text-sm font-semibold bg-green-600 flex items-center justify-center h-5 w-5 p-1 -m-2 rounded-full text-white">{cartItems.length}</h1>
          </li>
        </ul>
      </div>
      <div className="pt-20"></div>
    </>
  );
};

export default Header;