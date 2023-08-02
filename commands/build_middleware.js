const { buildMiddleware } = require("../cli/build")
exports.command = (program) => {
    program
        .command("build:middleware")
        .description("Build Middleware, Usage: node x build:middleware <middleware-name>")
        .argument("<middlewareName>", "Middleware Name")
        .action(async (middlewareName) => {
            console.log(`Building Middleware: ${middlewareName}`)
            await buildMiddleware(middlewareName)
        })
}