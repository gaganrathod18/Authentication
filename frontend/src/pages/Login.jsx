import axios from "../utils/axiosInstance";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      console.log("token");
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log("Login error", err.response?.data?.message ||err.message);
      setError(err.response?.data?.message || "Login error");
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white p-7 rounded-none md:rounded-lg  w-full max-w-md shadow-[0_0_2px_#0ff4,inset_0_0_2px_#0ff4,0_0_5px_#0ff4,0_0_10px_#0ff4,0_0_30px_#0ff4]"
      >
        <h2 className="text-4xl font-bold mb-4 text-center ">
          GEF<span className="text-cyan-400">i</span> AUTH
        </h2>
        <h4 className="text-center mt-4 mb-4">
          Welcome back ! <span className="mx-3 font-semibold">|</span>Login in
          to your account
        </h4>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-lg bg-cyan-950"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-lg bg-cyan-950"
          required
        />
        <button
          type="submit"
          className="w-full mb-3 px-4 py-2 rounded-lg text-black bg-cyan-400 text-lg font-semibold "
        >
          Login
        </button>
        <h4 className="text-center mt-4 mb-4">
          Don't have a account ?{" "}
          <span className="text-cyan-400">
            <Link to="/register">Sign up</Link>
          </span>
        </h4>
      </form>
    </div>
  );
}

export default Login;
