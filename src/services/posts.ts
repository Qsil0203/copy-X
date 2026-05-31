import { API_URL } from "../constants/api-url";

export const POSTS_SERVICE = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}