import React, { Component } from "react";
import axios from "axios";
import service from "../api/service";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"

export default class AddCost extends Component {
  state = {
    concept: "",
    costImport: 0,
    date: "",
    receipt: {},
    ticket: {
      merchant: "",
      items: [],
    },
  };

  handleSubmit = async (e) => {
    const { concept, costImport, date } = this.state;
    e.preventDefault();
    console.log("hola");
    try {
      const res = await axios({
        method: "POST",
        url:
          process.env.REACT_APP_API_URL +
          `/costs/add/${this.props.location.state.groupsList._id}`,
        withCredentials: true,
        data: { concept: concept, costImport: costImport, date: date },
      });

      this.setState({
        concept: "",
        costImport: 0,
        date: ""
      });
    } catch (error) {
      console.log(error, "POST expenses error");
    }
  };
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  handleFileUpload = async (e) => {
    console.log("the file to be uploadesd is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const res = await service.handleFileUpload(uploadData);
      console.log("response is", res);
      this.setState({ image: res.secure_url }); //Fins aqui es igual que pujar la imatge al perfil
      const receipt_raw = await axios({
        method: "POST",
        url:
          "https://projectemar.cognitiveservices.azure.com/formrecognizer/v2.1-preview.1/prebuilt/receipt/analyze",
        headers: {
          "ocp-apim-subscription-key": process.env.REACT_APP_RECEIPT_API_KEY,
          "content-type": "application/json",
        },
        data: { source: res.secure_url },
      }); // FEM LA PETICIO A MICROSOFT EN LA URL DE CLOUDINARY
      let finished = false;
      let receipt;
      while (!finished) {
        receipt = await axios({
          method: "GET",
          url: receipt_raw.headers["operation-location"], // HO POSEM EN CORXETES PERQUE NO ACCEPTA DOT NOTATION
          headers: {
            "ocp-apim-subscription-key": process.env.REACT_APP_RECEIPT_API_KEY,
            "content-type": "application/json",
          },
        });
        await this.sleep(0.5);
        console.log(receipt.data.status);
        if (
          receipt.data.status == "running" ||
          receipt.data.status == "notStarted"
        ) {
          finished = false;
        } else {
          finished = true;
        }
      }
      console.log(receipt.data);
      let obj = {
        merchant:
          receipt.data.analyzeResult.documentResults[0].fields.MerchantName
            .text,
        items: [],
      };
      let item;
      for (var march in receipt.data.analyzeResult.documentResults[0].fields
        .Items.valueArray) {
        item =
          receipt.data.analyzeResult.documentResults[0].fields.Items.valueArray[
            march
          ];

        obj.items.push({
          name: item.valueObject.Name.text,
          price: item.valueObject.TotalPrice.text,
        });
      }
      this.setState({ ticket: obj });
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Concept:</label>
            <input
              type="text"
              name="concept"
              value={this.state.concept}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label>Import:</label>
            <input
              type="number"
              name="costImport"
              value={this.state.costImport}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input type="submit" value="Add cost" onClick={this.props.history.goBack}/>
          </div>
          <label for="image"> Image: </label>
          <input
            type="file"
            name="image"
            value=""
            onChange={(e) => this.handleFileUpload(e)}
          />
          <div>
            <span>{this.state.ticket.merchant}</span>
            <ul>
              {this.state.ticket.items.map((item) => {
                return (
                  <li>
                    {item.name} - {item.price}
                  </li>
                );
              })}
            </ul>
          </div>
        </form>
        <button onClick={this.props.history.goBack}>Go Back</button>
        <Navbar/>   
      </div>
    );
  }
}
