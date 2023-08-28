const { buildRepository } = require("../cli/build")
exports.command = (program) => {
    program
        .command("build:repository")
        .description("Build Repository, Usage: node x build:repository <repository-name>")
        .argument("<repositoryName>", "Repository Name")
        .action(async (repositoryName) => {
            console.log(`Building Repository: ${repositoryName}`)
            await buildRepository(repositoryName)
        })
}
