import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/admin";

const fetchStudentData = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/students`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

const searchStudentData = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/students/search`, {
      params: data,
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

const adminLogin = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const verificationAdmin = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/verification-code`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const adminSignUp = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSingleStudentData = async (batch, id) => {
  try {
    const response = await axios.get(
      `${baseURL}/getuploadedinfo?batch=${batch}&uniqueId=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

export {
  fetchStudentData,
  uploadFile,
  fetchStudentBatches,
  adminLogin,
  verificationAdmin,
  adminSignUp,
  searchStudentData,
  getSingleStudentData,
};
