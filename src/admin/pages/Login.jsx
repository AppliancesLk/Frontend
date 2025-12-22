import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useLogin } from "../hooks/adminLogin";
import { getAdminUser } from "../../utils/authStorage";

export default function AdminLogin() {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login(email, password);
    const user = getAdminUser();

    if (success && user?.role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <AuthLayout title="Admin Login">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        
        {/* Email */}
        <div>
          <label className="text-black font-medium">Admin Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-black font-medium">Admin Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
      </form>

      {/* Optional: Add a link back to regular login if needed */}
      <p className="text-center mt-4 text-black">
        Are you a regular user?{" "}
        <a href="/login" className="text-yellow-500 font-semibold">
          User Login
        </a>
      </p>
    </AuthLayout>
  );
}