const { buildRepository } = require("../build")
exports.command = (program) => {
    program
        .command("build:repository")
        .description("Build Repository, Usage: node x build:repository <repository-name>")
        .argument("<repositoryName>", "Repository Name")
        .option("-m, --module <modeuleName>", "Build Repository in a Module", null)
        .action(async (repositoryName, options) => {
            console.log(`Building Repository: ${repositoryName}`)
            await buildRepository(repositoryName, options)
            console.log(`Repository ${repositoryName} built successfully`)
        })
}
