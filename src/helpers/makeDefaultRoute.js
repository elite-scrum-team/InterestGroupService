
const { defaultSend, defaultError } = require('./defaults')


module.exports = (controllerAction) => (reqDesc) => (req, res) => {
    controllerAction(reqDesc(req))
    .then(defaultSend(res))
    .catch(defaultError(res)(500))
}