const { buildController } = require("../build")

exports.command = (program) => {
    program
        .command("build:controller")
        .description("Build Controller, Usage: node x build:controller <controller-name>")
        .argument("<controllerName>", "Controller Name")
        .action(async (controllerName) => {
            console.log(`Building Controller: ${controllerName}`)
            await buildController(controllerName)
        })
}
