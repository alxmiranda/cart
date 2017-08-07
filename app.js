const express = require("express");
const app = express();

app.use("/build", express.static(__dirname + "/build"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/pages/home/index.html')
})

app.listen(3000, (req, res) => console.log("Aplicação rodando na porta 3000"))