import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"; // Make sure this is set up with your baseURL

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.log("No token found, redirecting");
        navigate("/");
        return;
      }

      try {
        const res = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data:", res.data);
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
  return (
    <div className="flex justify-center items-center h-screen text-xl text-gray-500">
      Loading...
    </div>
  );
}

  return (
    <>
     <div className="min-h-screen flex items-start justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-8">
         <h1 className="text-2xl font-bold text-blue-600 mb-4">
     Welcome, {user.name}!
     </h1>
      <p className="text-gray-700 mb-2">
      <strong>Email:</strong> {user.email}
   </p>
   <p className="text-gray-700">
      <strong>User ID:</strong> {user.id || user._id}
    </p>
      </div>
     </div>
    </>
  );
}

export default Dashboard;


