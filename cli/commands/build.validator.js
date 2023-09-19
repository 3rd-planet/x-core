const { buildValidator } = require("../build")
exports.command = (program) => {
    program
        .command("build:validator")
        .description("Build Validator, Usage: node x build:validator <validator-name>")
        .argument("<validatorName>", "Validator Name")
        .option("-m, --module <modeuleName>", "Build Validator in a Module", null)
        .action(async (validatorName, options) => {
            console.log(`Building Validator: ${validatorName}`)
            await buildValidator(validatorName, options)
            console.log(`Validator ${validatorName} built successfully`)
        })
}
