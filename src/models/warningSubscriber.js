
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('warningSubscriber', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        warningId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    })
}

