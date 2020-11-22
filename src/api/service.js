import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:4000/api",
       withCredentials: true 
    });
  }
  handleFileUpload = async (image) => {
    console.log("file in service: ", image);

    try {
      const res = await this.service.post("/upload", image);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //profile
  handleEditClick = async (theProfile) => {
    try {
      const res = await this.service.put("/profile/edit/", theProfile);
      return res.data;
    } catch(error){
        console.log(error)
    }
  };

  //groups
  handleSubmit = async (groupImage) => {
    try {
        const res = await this.service.post("http://localhost:4000/groups/edit", groupImage)
        return res.data;
      } catch(error){
          console.log(error)
      }
    };

}



const axiosRequestFunctions = new Service();

export default axiosRequestFunctions;