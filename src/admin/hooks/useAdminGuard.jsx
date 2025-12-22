import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminToken } from "../../utils/authStorage";

export default function useAdminGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);
}
