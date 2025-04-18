const Memory = require("../models/Memory");

const fs = require("fs");

const removeOldImage = (memory) => {
  fs.unlink(`public/${memory.src}`, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Arquivo excluído com sucesso!");
    }
  });
};

// Create a new memory
const createMemory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = `image/${req.file.filename}`;

    console.log(req.file);

    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });
    await newMemory.save();
    res.json({ msg: "Memória criada com sucesso!", newMemory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memoria não encontrada" });
    }
    res.json(memory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memoria não encontrada" });
    }

    removeOldImage(memory);

    res.json({ msg: "Memoria deletada com sucesso!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createMemory,
  getMemories,
  getMemory,
  deleteMemory,
};
