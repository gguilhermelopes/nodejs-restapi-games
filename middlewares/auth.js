import jwt from "jsonwebtoken";
import { jwtSecret } from "../index.js";

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (authToken) {
    const token = authToken.split(" ")[1];
    jwt.verify(token, jwtSecret, (error, data) => {
      if (error) {
        res.status(401);
        res.json({ error: "Token inválido!" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ error: "Token inválido!" });
  }
};

export default auth;
