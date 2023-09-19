const { buildMail } = require("../build")
exports.command = (program) => {
    program
        .command("build:mail")
        .description("Build Mail, Usage: node x build:mail <mail-name>")
        .argument("<mailName>", "Mail Name")
        .option("-m, --module <modeuleName>", "Build Mail in a Module", null)
        .action(async (mailName, options) => {
            console.log(`Building Mail: ${mailName}`)
            await buildMail(mailName, options)
            console.log(`Mail ${mailName} built successfully`)
        })
}
