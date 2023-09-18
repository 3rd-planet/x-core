const fs = require("fs")
const path = require("path")
const { rootPath, appPath, packagePath } = require("./paths")

/**
 * Initializes the program.
 * @param program - The program object.
 * @returns none
 */
exports.init = async (program) => {
    const packageJson = require(rootPath + "/package.json")

    program.name("x").description("CLI Commands for framework x").version(packageJson.version)

    let commands = require("fs").readdirSync(packagePath + "/cli/commands")
    commands.forEach((command) => {
        require(packagePath + "/cli/commands/" + command).command(program)
    })

    if (fs.existsSync(appPath + "/commands")) {
        let userCommands = require("fs").readdirSync(appPath + "commands")
        userCommands.forEach((command) => {
            require(appPath + "/commands/" + command).command(program)
        })
    }
}
