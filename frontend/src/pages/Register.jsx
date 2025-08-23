import { useState } from "react";
import axios from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("auth/register", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error", err.response.data.message);
      setError(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white p-7 rounded-none md:rounded-lg  w-full max-w-md shadow-[0_0_2px_#0ff4,inset_0_0_2px_#0ff4,0_0_5px_#0ff4,0_0_10px_#0ff4,0_0_30px_#0ff4]
"
      >
        <h2 className="text-4xl font-bold mb-4 text-center ">
          GEF<span className="text-cyan-400">i</span> AUTH
        </h2>
        <h4 className="text-center mt-4 mb-4">Create a new account</h4>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 rounded-lg bg-cyan-950"
        />
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
          Register
        </button>
        <h4 className="text-center mt-4 mb-4">
          Already have a account ?{" "}
          <span className="text-cyan-400">
            <Link to="/">Login</Link>
          </span>
        </h4>
      </form>
    </div>
  );
}

export default Register;
