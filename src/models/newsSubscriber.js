
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('newsSubscriber', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        newsId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    })
}

