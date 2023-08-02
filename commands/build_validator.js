const { buildValidator } = require("../cli/build")
exports.command = (program) => {
    program
        .command("build:validator")
        .description("Build Validator, Usage: node x build:validator <validator-name>")
        .argument("<validatorName>", "Validator Name")
        .action(async (validatorName) => {
            console.log(`Building Validator: ${validatorName}`)
            await buildValidator(validatorName)
        })
}