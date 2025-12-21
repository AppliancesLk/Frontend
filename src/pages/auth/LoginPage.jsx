import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useLogin } from "../../hooks/useLogin";

export default function LoginPage() {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/"); // ✅ redirect to home
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">

        {/* Email */}
        <div>
          <label className="text-black font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-black font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="*******"
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-4 text-black">
        Don't have an account?{" "}
        <a href="/register" className="text-yellow-500 font-semibold">
          Register
        </a>
      </p>
    </AuthLayout>
  );
}
