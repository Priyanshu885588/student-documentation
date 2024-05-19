import axios from "axios";

const baseURL = "http://34.228.8.172/api/v1";

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

const getStudentDetails = async (batch) => {
  try {
    const token = localStorage.getItem("studentToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${baseURL}/getStudentinfo?batch=${batch}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const documentsUpload = async (data, batch) => {
  try {
    const token = localStorage.getItem("studentToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${baseURL}/uploaddocuments?batch=${batch}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDocumentsDetails = async (batch) => {
  try {
    const token = localStorage.getItem("studentToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${baseURL}/getStudentdocuments?batch=${batch}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDocumentsList = async (batch) => {
  try {
    const response = await axios.get(
      `${baseURL}/admin/getDocumentColumnNames?batch=${batch}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  studentLogin,
  studentDetailsUpload,
  getStudentDetails,
  documentsUpload,
  getDocumentsDetails,
  getDocumentsList,
};
