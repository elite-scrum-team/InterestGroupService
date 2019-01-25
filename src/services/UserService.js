const services = require('../util/services');

console.log(`user-service: ${process.env.USER_SERVICE_SERVICE_HOST}`);

if (!process.env.USER_SERVICE_SERVICE_HOST) {
    process.env['USER_SERVICE_SERVICE_HOST'] = 'localhost:5000';
}

module.exports = {
    async retriveOne(id) {
        return await services.fetch.get('user', `user/${id}`, {});
    },

    async retrieveOneGroup(id) {
        return await services.fetch.get('user', `group/${id}`, {})
    }
};
