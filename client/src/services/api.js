// services/api.js

import axios from "axios";

const API_URL = "https://file-sharing-mxpa.onrender.com"; // Updated deployment link

export const uploadFile = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/upload`, data);
    return response.data;
  } catch (error) {
    console.log("Error while calling the API ", error.message);
    throw error;
  }
};
