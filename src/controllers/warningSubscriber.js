
const db = require('../models')
const defaultOperations = require('../helpers/defaultOperations')

const sendFunction = async (reqData) => {
    console.log(typeof reqData, reqData.warningId, reqData)
    return ["Everything is fine"]
}

module.exports = {
    ...defaultOperations(db.warningSubscriber, sendFunction),
    
}
