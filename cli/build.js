const fs = require("fs")
const path = require("path")
const { rootPath, appPath, packagePath } = require("./paths")

/**
 * Creates a file for the given file path and stub name.
 * @param filePath
 * @param stubName
 * @returns {Promise<void|boolean>}
 */
const builder = async (filePath, stubName) => {
    if (fs.existsSync(filePath)) {
        console.log(filePath + ` already exists.`)
        return false
    }

    let userStubsFile = path.join(rootPath, "stubs", stubName)

    let stub = fs.existsSync(userStubsFile)
        ? fs.readFileSync(userStubsFile, "utf8")
        : fs.readFileSync(path.join(packagePath, "stubs/" + stubName), "utf8")

    let dirs = filePath.split("/")
    dirs.pop()

    const dir = dirs.join("/")
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    return fs.writeFile(filePath, stub, (err) => {
        if (err) {
            console.log(err)

            return false
        }

        return true
    })
}

/**
 * Creates a controller file for the given controller name.
 * @param {string} name - The name of the controller.
 * @returns None
 */
exports.buildController = async (name) => {
    const filePath = path.join(appPath, "controllers", `${name}.controller.js`)

    if (await builder(filePath, "controller.stubs")) {
        console.log(`Controller ${name}.controller.js created successfully`)
    }
}

/**
 * Creates a repository file for the given repository name.
 * @param {string} name - The name of the repository.
 * @returns None
 */
exports.buildRepository = async (name) => {
    let repoDir = path.join(appPath, "repositories")

    if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir, { recursive: true })
    }

    const filePath = path.join(repoDir, `${name}.repository.js`)

    if (await builder(filePath, "repository.stubs")) {
        console.log(`Repository ${name}.repository.js created successfully`)
    }
}

/**
 * Creates a validator file for the given validator name.
 * @param name
 * @returns {Promise<void>}
 */
exports.buildValidator = async (name) => {
    const filePath = path.join(appPath, "middlewares/validators", `${name}.validations.js`)

    if (await builder(filePath, "validator.stubs")) {
        console.log(`Validator ${name}.validation.js created successfully`)
    }
}

/**
 * Creates a middleware file for the given middleware name.
 * @param name
 * @returns {Promise<void>}
 */
exports.buildMiddleware = async (name) => {
    const filePath = path.join(appPath, "middlewares", `${name}.middleware.js`)

    if (await builder(filePath, "middleware.stubs")) {
        console.log(`Middleware ${name}.middleware.js created successfully`)
    }
}

/**
 * Creates a command file for the given command name.
 * @param name
 * @returns {Promise<void>}
 */
exports.buildCommand = async (name) => {
    let repoDir = path.join(appPath, "commands")

    if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir, { recursive: true })
    }

    const filePath = path.join(repoDir, `${name}.js`)

    if (await builder(filePath, "command.stubs")) {
        console.log(`Command ${name}.js created successfully`)
    }
}

/**
 * Creates a route file for the given route name.
 * @param name
 * @returns {Promise<void>}
 */
exports.buildRoute = async (name) => {
    const filePath = path.join(appPath, "routes", `${name}.route.js`)

    if (await builder(filePath, "route.stubs")) {
        console.log(`Route ${name}.route.js created successfully`)
    }
}

/**
 *
 * @param name
 * @returns {Promise<void>}
 */
exports.buildMail = async (name) => {
    let repoDir = path.join(rootPath, "mails")

    if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir, { recursive: true })
    }

    const filePath = path.join(repoDir, `${name}.mail.mjml`)

    if (await builder(filePath, "mail.stubs")) {
        console.log(`Mail ${name}.mail.mjml created successfully`)
    }
}
