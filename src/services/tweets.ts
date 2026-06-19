import { API_URL } from "../constants/api-url";
import axios from 'axios';

export const TWEETS_SERVICE = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}tweets`);
      return response.data;
    } catch (error) {
      console.error(error);
      return []; 
    }
  },
  
  create: async(data: any) => {
    try {
      const response = await axios.post(`${API_URL}tweets`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}