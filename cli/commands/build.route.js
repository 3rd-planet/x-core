const { buildRoute } = require("../build")

exports.command = (program) => {
    program
        .command("build:route")
        .description("Build Route, Usage: node x build:route <command-name>")
        .argument("<routeName>", "Route Name")
        .option("-m, --module <modeuleName>", "Build Route in a Module", null)
        .action(async (routeName, options) => {
            console.log(`Building Route: ${routeName}`)
            await buildRoute(routeName, options)
            console.log(`Route ${routeName} built successfully`)
        })
}
