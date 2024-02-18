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

const studentDetailsUpload = async (data) => {
  try {
    const token = localStorage.getItem("studentToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${baseURL}/uploadinfo`, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { studentLogin, studentDetailsUpload };
