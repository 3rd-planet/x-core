const { buildMiddleware } = require("../build")
exports.command = (program) => {
    program
        .command("build:middleware")
        .description("Build Middleware, Usage: node x build:middleware <middleware-name>")
        .argument("<middlewareName>", "Middleware Name")
        .option("-m, --module <modeuleName>", "Build Middleware in a Module", null)
        .action(async (middlewareName, options) => {
            console.log(`Building Middleware: ${middlewareName}`)
            await buildMiddleware(middlewareName, options)
            console.log(`Middleware ${middlewareName} built successfully`)
        })
}
