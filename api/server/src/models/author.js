module.exports = (sequelize, DataTypes) => {
    const author = sequelize.define('author', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'full_name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            references: {
                model: 'user',
                key: 'id'
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        }
    });

    author.associate = function (models) {
        author.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
        author.hasMany(models.book, {foreignKey: 'authorId', targetKey: 'id'});

    };

    return author
};
