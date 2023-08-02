const { buildCommand } = require("../cli/build")
exports.command = (program) => {
    program
        .command("build:command")
        .description("Build Command, Usage: node x build:command <command-name>")
        .argument("<commandName>", "Command Name")
        .action(async (commandName) => {
            console.log(`Building Command: ${commandName}`)
            await buildCommand(commandName)
        })
}