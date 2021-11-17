module.exports = (sequelize, DataTypes) => {
    const author = sequelize.define('author', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'user',
                key: 'id'
            }

        }
    });

    author.associate = function (models) {
        author.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
        author.hasMany(models.book, {foreignKey: 'authorId', targetKey: 'id'});

    };

    return author
};
