import { API_URL } from "../constants/api-url";

export const COMMENTS_SERVICE = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}comments`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}