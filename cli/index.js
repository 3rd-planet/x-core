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

    let commands = []

    let packageCommandPath = path.join(packagePath, "cli", "commands")
    require("fs")
        .readdirSync(packageCommandPath)
        .forEach((command) => {
            commands.push(path.join(packageCommandPath, command))
        })

    let userCommandPath = path.join(appPath, "commands")
    if (fs.existsSync(userCommandPath)) {
        require("fs")
            .readdirSync(userCommandPath)
            .forEach((command) => {
                commands.push(path.join(userCommandPath, command))
            })
    }

    let activeModules = packageJson.xconfig.modules
    if (activeModules.length > 0) {
        activeModules.forEach((module) => {
            let moduleCommandPath = path.join(rootPath, "modules", module, "app", "commands")
            if (fs.existsSync(moduleCommandPath)) {
                require("fs")
                    .readdirSync(moduleCommandPath)
                    .forEach((command) => {
                        commands.push(path.join(moduleCommandPath, command))
                    })
            }
        })
    }

    commands.forEach((command) => {
        require(command).command(program)
    })
}
