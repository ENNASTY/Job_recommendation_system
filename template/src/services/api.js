import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Remplacez par l'URL de votre API Flask
});

export const getRecommendations = async (userDescription) => {
  try {
    const response = await api.post("/recommend", {
      description: userDescription,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};

export default api;
