import "./AddMemory.css";

import React from "react";
import { useState } from "react";

import axios from "../axios-config";

const AddMemory = () => {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("image", image);

    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="add-memory-page">
      <h2>Crie uma nova memória</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Título:</p>
          <input
            type="text"
            placeholder="Defina um título"
            name="title"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Descrição:</p>
          <textarea
            name="description"
            placeholder="Descreva sua memória..."
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          <p>Foto:</p>
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <input type="submit" className="btn" value="Criar memória" />
      </form>
    </div>
  );
};

export default AddMemory;
