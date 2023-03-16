import Sequelize from "sequelize";

const connection = new Sequelize("gamesapi", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

export default connection;
