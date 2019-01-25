const services = require('../util/services')

console.log(`notification-service: ${process.env.NOTIFICATION_SERVICE_SERVICE_HOST}`)

if (!process.env.NOTIFICATION_SERVICE_SERVICE_HOST) {
    process.env['NOTIFICATION_SERVICE_SERVICE_HOST'] = '35.228.80.86:80'
}

module.exports = {
    async sendEmail(title, comment, emails, status) {
        const url = status ? 'email/updatedwarningstatus' : 'email/newcomment'
        console.log("sending emails with url ", url)
        return await services.fetch.post(
            'notification', 
            url,
            {},
            { title, comment, emails, status }
        )
    }
}
