
module.exports = {
    errMap: err => err['errors'] 
        ? err.errors.map(it => it.message)
        : [err],
    defaultError: res => status => err => res.status(status).json(errMap(err)),
    defaultSend: res => it => res.json(it),
    defaultReqDesc: req => ({ ...req.body, userId: req.query.internalUserId }),
    defaultConfig: {
        subscribe: 'POST',
        unsubscribe: 'DELETE',
        userinfo: 'GET',
        send: 'POST'
    }
}