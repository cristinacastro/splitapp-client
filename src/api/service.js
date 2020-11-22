import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:4000/api",
       withCredentials: true 
    });
  }
  handleUpload = async (image) => {
    console.log("file in service: ", image);

    try {
      const res = await this.service.post("/upload", image);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  handleEditClick = async (theProfile) => {
    try {
      const res = await this.service.put("/profile/edit/", theProfile);
      return res.data;
    } catch(error){
        console.log(error)
    }
  };




}