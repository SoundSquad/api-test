const { DataTypes, Sequelize } = require("sequelize"); 
const { USE } = require("sequelize/lib/index-hints");

const config = require(__dirname + "/../config/config.js"); // db 연결 정보
const db = {}; // 빈 객체

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // sequelize 객체

