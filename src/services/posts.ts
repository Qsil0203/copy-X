import { API_URL } from "../constants/api-url";
import axios from 'axios';

export const POSTS_SERVICE = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}tweets`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  
  postTweet: async() => {
    try{
       const response = await axios.post(`${API_URL}tweets`, {
        "id": 4,
        "userId": 1,
        "content": "Loving this new platform!",
        "createdAt": "2026-03-27T15:30:00"
    })
    return response.data
    }catch (error){
      console.log(error)
    }
  }
}