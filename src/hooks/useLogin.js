import { useState } from "react";
import api from "../lib/api";
import { setAuth } from "../utils/authStorage";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      //  Secure centralized storage
      setAuth(token, {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return true; // success
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
