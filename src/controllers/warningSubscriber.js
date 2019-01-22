
const db = require('../models')
const defaultOperations = require('../helpers/defaultOperations')


module.exports = {
    ...defaultOperations(db.warningSubscriber, (instance => console.log("THIS SHOULD BE SENDING, NOT IMPLEMENTED YET", instance))),
    
}
