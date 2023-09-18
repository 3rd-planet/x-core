const { buildCommand } = require("../build")
exports.command = (program) => {
    program
        .command("build:command")
        .description("Build Command, Usage: node x build:command <command-name>")
        .argument("<commandName>", "Command Name")
        .option("-m, --module <modeuleName>", "Build Command in a Module", null)
        .action(async (commandName, options) => {
            console.log(`Building Command: ${commandName}`)
            await buildCommand(commandName, options)
            console.log(`Command ${commandName} built successfully`)
        })
}
