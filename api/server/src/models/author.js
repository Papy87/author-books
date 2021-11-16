module.exports = (sequelize, DataTypes) => {
    return sequelize.define('author', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field:'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field:'last_name'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'user_id'

        }
    });
};
