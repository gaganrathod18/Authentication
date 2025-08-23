import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState,useRef  } from "react";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status from localStorage
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [window.location.pathname]); // update on page change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">GViteAuth</h1>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <div className="flex gap-4">
              <Link
                to="/dashboard"
                className="text-gray-700  rounded-4xl px-2.5 py-1 hover:text-white hover:bg-blue-600 "
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className=" text-gray-600 hover:text-red-500"
              >
                <LogOut size={18} /> 
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
