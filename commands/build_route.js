const { buildRoute } = require("../cli/build")

exports.command = (program) => {
    program
        .command("build:route")
        .description("Build Route, Usage: node x build:route <command-name>")
        .argument("<routeName>", "Route Name")
        .action(async (routeName) => {
            console.log(`Building Route: ${routeName}`)
            await buildRoute(routeName)
            console.info(`Route ${routeName} built.`)
        })
}
