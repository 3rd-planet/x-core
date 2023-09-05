const { rootPath } = require("./paths")
const fs = require("fs")
const packageJson = require(rootPath + "package.json")

/**
 * Initializes the program.
 * @param program - The program object.
 * @returns none
 */
exports.init = async (program) => {
    program.name("x").description("CLI Commands for framework x").version(packageJson.version)

    let commands = require("fs").readdirSync(__dirname + "/commands")
    commands.forEach((command) => {
        require(__dirname + "/commands/" + command).command(program)
    })

    if (fs.existsSync(rootPath + "/commands")) {
        let userCommands = require("fs").readdirSync(rootPath + "commands")
        userCommands.forEach((command) => {
            require(rootPath + "/commands/" + command).command(program)
        })
    }
}
