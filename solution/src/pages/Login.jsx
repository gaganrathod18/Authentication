import { useState } from "react";
import axios from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- new state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
      toast.success("Logged in successfully!");
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Login
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          onChange={handleChange}
          value={form.email}
          required
        />
        <div className="relative mb-auto">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded"
            onChange={handleChange}
            value={form.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="block w-1/2 mx-auto bg-blue-600 text-white py-2 rounded-4xl hover:bg-blue-700"
        >
          Login
        </button>
        <h3 className="text-center mt-4">
          Don't have a account ?{" "}
          <span className="text-blue-500">
            <Link to="/">Sign up</Link>
          </span>
        </h3>
      </form>
    </div>
  );
};

export default Login;
