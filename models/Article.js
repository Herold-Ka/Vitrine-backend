module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "Arcticle", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.DataTypes.STRING(30),
                AllowNull: false,
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                AllowNull: false,
            },
            media: {
                type: Sequelize.DataTypes.STRING(20),
                AllowNull: false,
            },
        }, {
            timestamps: true,
            underscored: true,
        }
    );
};