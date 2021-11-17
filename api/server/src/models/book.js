module.exports = (sequelize, DataTypes) => {
    const book = sequelize.define('book', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'author_id',
            references: {
                model: 'author',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    book.associate = function (model) {
        book.belongsTo(model.author, {foreignKey: 'authorId', targetKey: 'id'})
    }
    return book
};
