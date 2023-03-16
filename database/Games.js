import Sequelize from "sequelize";
import connection from "./database.js";

const Games = connection.define("games", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Games;
