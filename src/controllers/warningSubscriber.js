
const db = require('../models');
const defaultOperations = require('../helpers/defaultOperations');

const UserService = require('../services/UserService');
const NotificationService = require('../services/NotificationService');

const sendFunction = async (reqData) => {
    const { title, comment, warningId, status } = reqData;
    const userIds = await db.warningSubscriber.findAll({
        where: {
            warningId
        }
    }).then(subscribers => subscribers.map(it => it.dataValues.userId));
    const users = await Promise.all(
        userIds.map(async it => await UserService.retriveOne(it)
            .then( user => user.json())));
    const emails = users.filter(it => it.email).map(it => ({ email: it.email }));
    console.log("Sending emails to", emails);
    const result = await NotificationService.sendEmail(title, comment, emails, status);
    return await result.status === 202 
        ? { dataValues: { msg: "Emails where sent successfully" } }
        : db.sequelize.Promise.reject("Emails could not be sent");
};

module.exports = {
    ...defaultOperations(db.warningSubscriber, sendFunction),
    
};
