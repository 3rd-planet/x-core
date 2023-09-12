const nodemailer = require("nodemailer")
const { MAILER_HOST, MAILER_PORT, MAILER_SECURE, MAILER_USER, MAILER_PASS } = require("../helpers/constants")

/**
 * create transporter for node mailer.
 * @returns {Promise<*>}
 */
exports.createTransporter = async () => {
    return nodemailer.createTransport({
        host: MAILER_HOST,
        port: MAILER_PORT,
        secure: MAILER_SECURE === "true",
        auth: {
            user: MAILER_USER,
            pass: MAILER_PASS
        }
    })
}

/**
 * send mail.
 * @param mailOptions
 * @returns {Promise<void>}
 */
exports.sendMail = async (mailOptions) => {
    let transporter = await this.createTransporter()
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        // console.log("Message sent: %s", info.messageId)
    })
}