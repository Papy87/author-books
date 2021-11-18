module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_admin'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });
    user.associate = function (model) {
        user.hasOne(model.author, {foreignKey: 'userId', targetKey: 'id'})
    }
    return user
};
