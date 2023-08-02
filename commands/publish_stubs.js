const { publishStubs } = require("../cli/publish")
exports.command = (program) => {
    program
        .command("publish:stubs")
        .description("Publish Stubs (all available structures of build commands.), Usage: node x publish:stubs")
        .action(async (repositoryName) => {
            console.log(`Publishing Stubs`)
            await publishStubs()
        })
}