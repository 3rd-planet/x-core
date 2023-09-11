const { rootPath, packagePath, appPath } = require("./paths")
const fs = require("fs")
const packageJson = require(rootPath + "package.json")

/**
 * Initializes the program.
 * @param program - The program object.
 * @returns none
 */
exports.init = async (program) => {
    program.name("x").description("CLI Commands for framework x").version(packageJson.version)

    let commands = require("fs").readdirSync(packagePath + "/commands")
    commands.forEach((command) => {
        require(packagePath + "/commands/" + command).command(program)
    })

    if (fs.existsSync(appPath + "/commands")) {
        let userCommands = require("fs").readdirSync(appPath + "commands")
        userCommands.forEach((command) => {
            require(appPath + "/commands/" + command).command(program)
        })
    }
}