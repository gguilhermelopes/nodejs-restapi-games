import express, { json, urlencoded } from "express";
import connection from "./database/database.js";
import Games from "./database/Games.js";
import Users from "./database/Users.js";
import auth from "./middlewares/auth.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 8080;

export const jwtSecret = "123456789";

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

connection
  .authenticate()
  .then(() => console.log("Conectado ao banco de dados!"))
  .catch((error) => console.log(error));

app.get("/games", auth, (req, res) => {
  Games.findAll().then((games) => {
    res.json({ user: req.loggedUser, games });
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

app.post("/user", (req, res) => {
  const { name, email, password } = req.body;

  Users.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      res.sendStatus(400);
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      Users.create({ name, email, password: hash })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          res.sendStatus(400);
        });
    }
  });
});

app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      const correct = bcrypt.compareSync(password, user.password);
      if (correct) {
        jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret,
          { expiresIn: "48h" },
          (error, token) => {
            if (error) {
              res.status(400);
              res.json({ error: "Falha interna" });
            } else {
              res.status(200);
              res.json({ token });
            }
          }
        );
      } else {
        res.status(401);
        res.json({ error: "Senha inválida!" });
      }
    } else {
      res.status(404);
      res.json({ error: "Email não encontrado!" });
    }
  });
});

app.listen(port, () => {
  console.log("API online!");
});
