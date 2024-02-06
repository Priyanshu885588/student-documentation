import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

const studentLogin = async (data, batch) => {
  try {
    const response = await axios.post(`${baseURL}/login?batch=${batch}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { studentLogin };
