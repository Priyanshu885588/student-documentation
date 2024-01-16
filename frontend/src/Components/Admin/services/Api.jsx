import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/admin";

const fetchStudentData = async (batch) => {
  try {
    const response = await axios.get(`${baseURL}/students`, {
      params: { batch },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

const fetchStudentBatches = async () => {
  try {
    const response = await axios.get(`${baseURL}/students/batches`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};
const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/upload`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { fetchStudentData, uploadFile, fetchStudentBatches };