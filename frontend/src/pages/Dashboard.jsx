import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || res.data);
      } catch (err) {
        console.log("Error fetching user", err.response?.data || err.message);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="bg-black p-6 rounded-none md:rounded-lg  w-full max-w-md mt-8 shadow-[0_0_2px_#0ff4,inset_0_0_2px_#0ff4,0_0_5px_#0ff4,0_0_10px_#0ff4,0_0_30px_#0ff4]
">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-100 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-100">
            <strong>User ID:</strong> {user.id || user._id}
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
