import { API_URL } from "../constants/api-url";

export const Likes_SERVICE = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}likes`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}