import { useState } from "react";
import api from "../../lib/api";
import { setAdminAuth } from "../../utils/authStorage";

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

      if (user.role != "admin") {
        setError(err.response?.data?.message || "Invalid Admin credential");
        return false;
      }

      //  Secure centralized storage
      setAdminAuth(token, {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return true; 
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
