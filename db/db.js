const Sequelize = require("sequelize")

const db = {};

const dbinfo = new Sequelize('vitrinebsd','root','', {
        host: 'localhost',
        dialect: "mysql",
        port: 3306,
        pool: {
            max: 100,
            min: 0,
        },
    }
);

dbinfo.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

db.article = require("../models/Article")(dbinfo, Sequelize);
db.image = require("../models/Image")(dbinfo, Sequelize);

//article
db.image.belongsTo(db.article, { foreignKey: "articleId" });
db.article.hasOne(db.image, { foreignKey: "articleId" });


db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

dbinfo.sync({ force: true });
    
module.exports = db;