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

  const [name, setName] = useState("");
  const [text, setText] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const comment = { name, text };

      const res = await axios.patch(
        `/memories/${memory._id}/comment/`,
        comment
      );

      const lastComment = res.data.memory.comments.pop();
      setComments((comments) => [...comments, lastComment]);

      setName("");
      setText("");

      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  if (!memory) return <p>Carregando...</p>;

  return (
    <div className="memory-page">
      <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
      <h2>{memory.title}</h2>
      <p>{memory.description}</p>
      <div className="comment-form">
        <h3>Envie o seu comentário:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            <input
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label htmlFor="">
            <textarea
              placeholder="Digite seu comentário"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
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
