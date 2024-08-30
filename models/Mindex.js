const { DataTypes, Sequelize } = require("sequelize"); 

const config = require(__dirname + "/../config/config.json")['development']; // db 연결 정보
const db = {}; // 빈 객체

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // sequelize 객체

const ArtistsModel = require('./Martists')(sequelize, Sequelize);
// const ConcertModel = require('./Mconcerts')(sequelize, Sequelize);

async function syncModels() {
  try {
    let flag = false;
    // ArtistsModel 테이블 먼저 생성
    
    await ArtistsModel.sync({ force: flag });
    console.log("*** Artists table created");

    // await ConcertModel.sync({ force: flag });
    // console.log("*** Artists table created");

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

syncModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Artists = ArtistsModel;
// db.Concerts = concertModel;

module.exports = db;
