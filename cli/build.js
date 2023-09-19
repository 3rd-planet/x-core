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
        process.exit(1)
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
        if (err) console.log(err)
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
 * @param name - The name of the validator.
 * @param options - The option object.
 * @returns {Promise<void>}
 */
exports.buildValidator = async (name, options) => {
    const filePath =
        options.module !== null
            ? path.join(
                  rootPath,
                  "modules",
                  options.module,
                  "app",
                  "middlewares",
                  "validators",
                  `${name}.validations.js`
              )
            : path.join(appPath, "middlewares", "validators", `${name}.validations.js`)

    await builder(filePath, "validator.stubs")
}

/**
 * Creates a middleware file for the given middleware name.
 * @param name - The name of the middleware.
 * @param options - The option object.
 * @returns {Promise<void>}
 */
exports.buildMiddleware = async (name, options) => {
    const filePath =
        options.module !== null
            ? path.join(rootPath, "modules", options.module, "app", "middlewares", `${name}.middleware.js`)
            : path.join(appPath, "middlewares", `${name}.middleware.js`)

    await builder(filePath, "middleware.stubs")
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
 * @param name - The name of the route.
 * @param options - The option object.
 * @returns {Promise<void>}
 */
exports.buildRoute = async (name, options) => {
    const filePath =
        options.module !== null
            ? path.join(rootPath, "modules", options.module, "app", "routes", `${name}.route.js`)
            : path.join(appPath, "routes", `${name}.route.js`)

    await builder(filePath, "route.stubs")
}

/**
 * Creates a Mail file
 * @param name - The name of the model.
 * @param options - The option object.
 * @returns {Promise<void>}
 */
exports.buildMail = async (name, options) => {
    let repoDir =
        options.module !== null
            ? path.join(rootPath, "modules", options.module, "mails")
            : path.join(rootPath, "mails")

    if (!fs.existsSync(repoDir)) fs.mkdirSync(repoDir, { recursive: true })

    await builder(path.join(repoDir, `${name}.mail.mjml`), "mail.stubs")
}
