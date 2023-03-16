import express, { json, urlencoded } from "express";
import connection from "./database/database.js";
import Games from "./database/Games.js";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

connection
  .authenticate()
  .then(() => console.log("Conectado ao banco de dados!"))
  .catch((error) => console.log(error));

app.get("/games", (req, res) => {
  Games.findAll().then((games) => {
    res.json(games);
  });
});

app.get("/game/:id", (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    Games.findOne({
      where: { id: id },
    }).then((game) => {
      game ? res.json(game) : res.sendStatus(404);
    });
  }
});

app.post("/game", (req, res) => {
  const { title, year, price } = req.body;
  if (title && year && !isNaN(year) && price && !isNaN(price)) {
    Games.create({
      title,
      year,
      price,
    }).then(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

app.delete("/game/:id", (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    Games.destroy({ where: { id: id } }).then((num) => {
      if (num == 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  }
});

app.put("/game/:id", (req, res) => {
  const { id } = req.params;
  const { title, year, price } = req.body;

  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    Games.update({ title, year, price }, { where: { id: id } }).then(() => {
      res.sendStatus(200);
    });
  }
});

app.listen(port, () => {
  console.log("API online!");
});
