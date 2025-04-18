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

const updateMemory = async (req, res) => {
  try {
    const { title, description } = req.body;

    let src = null;

    if (req.file) {
      src = `image/${req.file.filename}`;
    }

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memoria não encontrada" });
    }

    if (src) {
      removeOldImage(memory);
    }

    const updateDate = {};

    if (title) {
      updateDate.title = title;
    }

    if (description) {
      updateDate.description = description;
    }

    if (src) {
      updateDate.src = src;
    }

    const updateMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateDate,
      { new: true }
    );

    res.json({ msg: "Memoria atualizada com sucesso!", updateMemory });
  } catch (error) {}
};

const toggleFavorite = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memoria não encontrada" });
    }

    memory.favorite = !memory.favorite;
    await memory.save();

    res.json({ msg: "Adicionada aos favoritos!", memory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addComment = async (req, res) => {
  try {
    const { name, text } = req.body;

    if (!name || !text) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    const comment = {
      name,
      text,
    };

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memoria não encontrada" });
    }

    memory.comments.push(comment);
    await memory.save();

    res.json({ msg: "Comentário adicionado com sucesso!", memory });
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
  updateMemory,
  toggleFavorite,
  addComment,
};
