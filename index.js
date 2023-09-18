const fs = require("fs")
const path = require("path")

/**
 * Initializes the program.
 * @param program - The program object.
 * @param rootPath - The root path of the project.
 * @returns none
 */
exports.init = async (program, rootPath) => {
    console.log(rootPath)

    const packageJson = require(rootPath + "/package.json")

    program.name("x").description("CLI Commands for framework x").version(packageJson.version)

    let packagePath = path.join(rootPath, "node_modules/@3rdplanet/x-core")
    let appPath = path.join(rootPath, "app")

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
