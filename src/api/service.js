import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }
  handleFileUpload = async (image) => {

    try {
      const res = await this.service.post("/upload", image);
      return res.data;
    } catch (error) {
    }
  };
}

const axiosRequestFunctions = new Service();

export default axiosRequestFunctions;
