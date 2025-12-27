import { useEffect, useState } from "react";
import { fetchModels } from "../api/models.api";

export const useModels = (brandId) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels(brandId)
      .then((res) => setModels(res))
      .finally(() => setLoading(false));
  }, [brandId]);

  return { models, loading };
};
