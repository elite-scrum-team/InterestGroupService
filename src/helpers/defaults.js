
const errMap = require('./errMap')

module.exports = {
    defaultError: res => status => err => res.status(status).json(errMap(err)),
    defaultSend: res => it => res.json(it),
    defaultReqDesc: req => ({ ...req.body, userId: req.query.internalUserId }),
    defaultConfig: {
        subscribe: 'POST',
        unsubscribe: 'DELETE',
        userinfo: {
            method: 'GET',
            reqDesc: req => { 
                const { internalUserId, userId, ...rest } = req.query
                return ({ userId: internalUserId, ...rest }) 
            }
        },
        send: 'POST'
    }
}