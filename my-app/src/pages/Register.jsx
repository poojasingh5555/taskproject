import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white shadow-md rounded px-8 py-10 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition">Register</button>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}