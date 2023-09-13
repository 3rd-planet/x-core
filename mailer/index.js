const nodemailer = require("nodemailer")
const {
    MAILER_HOST,
    MAILER_PORT,
    MAILER_SECURE,
    MAILER_USER,
    MAILER_PASS,
    MAILER_FROM
} = require("../helpers/constants")

const mjml2html = require("mjml")
const path = require("path")
const fs = require("fs")
const { rootPath } = require("../paths")

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
 * send mail using node mailer.
 * @param template
 * @param mailOptions
 * @returns {Promise<void>}
 */
exports.sendMail = async (template, mailOptions) => {
    let transporter = await this.createTransporter()
    transporter.sendMail(
        {
            from: mailOptions.from || MAILER_FROM,
            to: mailOptions.to.join(", "),
            subject: mailOptions.subject,
            html: mjml2html(fs.readFileSync(path.join(rootPath, "../mails", template + ".mail.mjml"), "utf8"))
                .html
        },
        (error, info) => {
            if (error) {
                return console.log(error)
            }
            // console.log("Message sent: %s", info.messageId)
        }
    )
}
