const { buildController } = require("../build")

exports.command = (program) => {
    program
        .command("build:controller")
        .description("Build Controller, Usage: node x build:controller <controller-name>")
        .argument("<controllerName>", "Controller Name")
        .option("-m, --module <modeuleName>", "Build Controller in a Module", null)
        .action(async (controllerName, options) => {
            console.log(`Building Controller: ${controllerName}`)
            await buildController(controllerName, options)
            console.log(`Controller ${controllerName} built successfully`)
        })
}
