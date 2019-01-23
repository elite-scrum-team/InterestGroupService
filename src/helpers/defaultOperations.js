
module.exports = (model, sendAction) => ({
    subscribe: (data) =>
        model
        .create(data)
        .then(it => it.dataValues),

    unsubscribe: (data) =>
        model
        .findOne({ where: data })
        .then(it => it.destroy())
        .then(it => it.dataValues),

    userinfo: (data) =>
        model
        .findOne({ where: data })
        .then(it => it.dataValues),

    send: (data) => 
        sendAction(data)
})