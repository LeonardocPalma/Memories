import "./Home.css";

import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../axios-config";

const Home = () => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const getMemories = async () => {
      try {
        const response = await axios.get("/memories");
        setMemories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMemories();
  }, []);

  return (
    <div className="home">
      <h2>Confira as nossas memórias</h2>
      <div className="memories-container">
        {memories.length > 0 &&
          memories.map((memory) => (
            <div className="memory" key={memory._id}>
              <img
                src={`${axios.defaults.baseURL}${memory.src}`}
                alt={memory.title}
              />
              <p>{memory.title}</p>
              <Link to={`/memories/${memory._id}`} className="btn">
                Comentar
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
