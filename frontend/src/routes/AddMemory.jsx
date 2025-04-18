import "./AddMemory.css";

import axios from "axios";
import React from "react";
import { useState } from "react";

const AddMemory = () => {
  return (
    <div className="add-memory-page">
      <h2>Crie uma nova memória</h2>
      <form>
        <label>
          <p>Título:</p>
          <input type="text" placeholder="Defina um título" name="title" />
        </label>
        <label>
          <p>Descrição:</p>
          <textarea
            name="description"
            placeholder="Descreva sua memória..."
          ></textarea>
        </label>
        <label>
          <p>Foto:</p>
          <input type="file" name="image" />
        </label>
        <input type="submit" className="btn" value="Criar memória" />
      </form>
    </div>
  );
};

export default AddMemory;
