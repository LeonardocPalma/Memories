const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.0zgssho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
  console.log("Conectou ao banco de dados");
}

main().catch((err) => console.log(err));

module.export = main;
