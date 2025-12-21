import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token";

export default function useAdminGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);
}
