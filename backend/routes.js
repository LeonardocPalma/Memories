const express = require("express");

const router = express.Router();

const { createMemory } = require("./controllers/MemoryController");

const upload = require("./helpers/upload");

router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    const image = req.file;

    if (!image) {
      return res
        .status(400)
        .json({ error: "Nenhuma imagem enviada, por favor envie um!" });
    }

    next();
  },
  (req, res) => createMemory(req, res)
);

module.exports = router;
