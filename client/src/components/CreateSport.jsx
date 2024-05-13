import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
const CreateSport = () => {
  const [image, setImage] = useState(false);
  const [sportsData, setSportsData] = useState({
    name: "",
    image: "",
    maxTeamSize: 0,
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setSportsData({ ...sportsData, [e.target.name]: e.target.value });
  };
  const createSport = async () => {
    console.log(sportsData);
    // let responseData;
    // let product = productDetails;
    // let formData = new FormData();
    // formData.append("product", image);

    // await fetch("https://e-commerce-app-sqbo.onrender.com/upload", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     responseData = data;
    //   });
    // if (responseData.success) {
    //   product.image = responseData.image_url;
    //   await fetch("https://e-commerce-app-sqbo.onrender.com/addproduct", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(product),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.success) {
    //         alert("Product Added Successfully");
    //       } else {
    //         alert("Failed to add product");
    //       }
    //     });
    // }
  };
  return (
    <div>
      <h1>Create a Team</h1>
      <div className="create-sport">
        <div className="createSport-itemfield">
          <p>Sport title</p>
          <input
            value={sportsData.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="createTeam-itemfield">
          <p>Max. Team Size</p>
          <input
            type="text"
            value={sportsData.maxTeamSize}
            onChange={changeHandler}
            name="maxTeamSize"
            placeholder="Type here"
          />
        </div>
        <div className="createTeam-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className="createTeam-thumbnail-img"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            hidden
            id="file-input"
          />
        </div>
        <button
          onClick={() => {
            createSport();
          }}
          className="createSport-btn"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default CreateSport;
