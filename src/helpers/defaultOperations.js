
module.exports = (model, sendAction) => ({
    subscribe: (args) =>
        model
        .create(args)
        .then(it => it.dataValues),

    unsubscribe: (args) =>
        model
        .findOne({ where: args })
        .then(it => it.destroy())
        .then(it => it.dataValues),

    userinfo: (args) =>
        model
        .findOne({ where: args })
        .then(it => it.dataValues),

    send: (args) =>
        model.findOne({ where: args })
        .then(it => sendAction(it.dataValues.userIds))
})