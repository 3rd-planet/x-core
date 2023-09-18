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
 * @param {object} options - The option object.
 * @returns None
 */
exports.buildController = async (name, options) => {
    await builder(
        options.module !== null
            ? path.join(rootPath, "modules", options.module, "app", "controllers", `${name}.controller.js`)
            : path.join(appPath, "controllers", `${name}.controller.js`),
        "controller.stubs"
    )
}

/**
 * Creates a repository file for the given repository name.
 * @param {string} name - The name of the repository.
 * @param {object} options - The option object.
 * @returns None
 */
exports.buildRepository = async (name, options) => {
    let repoDir =
        options.module !== null
            ? path.join(rootPath, "modules", options.module, "app", "repositories")
            : path.join(appPath, "repositories")

    if (!fs.existsSync(repoDir)) fs.mkdirSync(repoDir, { recursive: true })

    await builder(path.join(repoDir, `${name}.repository.js`), "repository.stubs")
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
 * @param name - The name of the command.
 * @param options - The option object.
 * @returns {Promise<void>}
 */
exports.buildCommand = async (name, options) => {
    let repoDir =
        options.module !== null
            ? path.join(rootPath, "modules", options.module, "app", "commands")
            : path.join(appPath, "commands")

    if (!fs.existsSync(repoDir)) fs.mkdirSync(repoDir, { recursive: true })

    await builder(path.join(repoDir, `${name}.js`), "command.stubs")
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
