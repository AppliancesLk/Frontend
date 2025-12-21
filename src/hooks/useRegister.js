import { useState } from 'react';
import api from '../lib/api';
import { validateRegisterForm } from '../utils/validators';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const register = async (name, email, password, confirmPassword) => {
    const validationErrors = validateRegisterForm(
      name,
      email,
      password,
      confirmPassword
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    const payload = {
      name,
      email,
      password,
      role: 'user',
    };

    try {
      await api.post('/api/auth/register', payload);
      setSuccess(true);
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || 'Registration failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    errors,
    success,
  };
};
