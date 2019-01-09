
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('iterest_groups', {
        userId: DataTypes.STRING,
        eventId: DataTypes.STRING
    })
}

