import "./Memory.css";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../axios-config";

const Memory = () => {
  const { id } = useParams();

  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getMemory = async () => {
      try {
        const response = await axios.get(`/memories/${id}`);
        setMemory(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    getMemory();
  }, [id]);

  if (!memory) return <p>Carregando...</p>;

  return (
    <div className="memory-page">
      <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
      <h2>{memory.title}</h2>
      <p>{memory.description}</p>
      <div className="comment-form">
        <h3>Envie o seu comentário:</h3>
        <form>
          <label htmlFor="">
            <input type="text" placeholder="Digite seu nome" />
          </label>
          <label htmlFor="">
            <textarea placeholder="Digite seu comentário"></textarea>
          </label>
          <input type="submit" value={"Enviar"} className="btn" />
        </form>
      </div>
      <div className="comment-container">
        <h3>Comentários ({comments.length})</h3>
        {comments.length === 0 && <p>Ainda sem comentários</p>}
        {comments.length > 0 &&
          comments.map((comment) => (
            <div className="comment" key={comment._id}>
              <p className="comment-name">{comment.name}</p>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Memory;
