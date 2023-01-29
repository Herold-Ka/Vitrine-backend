module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "Image", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                AllowNull: false,
            },
        }, {
            timestamps: true,
            underscored: true,
        }
    );
};