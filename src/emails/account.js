const sgMail = require('@sendgrid/mail')

const sendgridApiKey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'siege.hatch@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the app, ${name}. Let us know what you think of our app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'siege.hatch@gmail.com',
        subject: 'We\'re sorry to see you go',
        text: `You have been removed from the app, ${name}. Is there anything we could have done to keep you around?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
