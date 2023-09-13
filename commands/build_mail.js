const { buildMail } = require("../cli/build")
exports.command = (program) => {
    program
        .command("build:mail")
        .description("Build Mail, Usage: node x build:mail <mail-name>")
        .argument("<mailName>", "Mail Name")
        .action(async (mailName) => {
            console.log(`Building Mail: ${mailName}`)
            await buildMail(mailName)
        })
}
