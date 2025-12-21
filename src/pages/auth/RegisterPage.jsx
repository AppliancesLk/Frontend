import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useRegister } from "../../hooks/useRegister";

export default function RegisterPage() {
  const { register, loading, errors, success } = useRegister();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    register(
      form.name,
      form.email,
      form.password,
      form.confirmPassword
    );
  };

  // ✅ Redirect to login after successful registration
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <AuthLayout title="Create an Account">
      <form onSubmit={handleRegister} className="flex flex-col gap-4">

        {/* Full Name */}
        <div>
          <label className="text-black font-medium">Full Name</label>
          <input
            name="name"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-black font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-black font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="*******"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-black font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full mt-1 px-4 py-2 border rounded-md text-black"
            placeholder="*******"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* API Error */}
        {errors.api && (
          <p className="text-sm text-red-500 text-center">
            {errors.api}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="text-sm text-green-600 text-center">
            Account created successfully! Redirecting to login...
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-4 text-black">
        Already have an account?{" "}
        <a href="/login" className="text-yellow-500 font-semibold">
          Login
        </a>
      </p>
    </AuthLayout>
  );
}
