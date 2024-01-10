const path = require("path")
const { appPath, rootPath, modulePath } = require("../paths")

const packageJson = require(rootPath + "package.json")
const { validationResult } = require("express-validator")


/**
 * Get the active modules from the package.json file.
 * @returns {object}
 */
exports.activeModules = () => {
    if (packageJson.xconfig.modules) {
        return packageJson.xconfig.modules
    }

    return {}
}

/**
 * Load routes from the app/routes directory and from the modules/<module>/app/routes directory.
 * @param app
 */
exports.loadRoutes = (app) => {
    let baseRoutesDir = path.join(appPath, "routes")
    let routesFiles = require("fs").readdirSync(baseRoutesDir)

    routesFiles = routesFiles.map((file) => {
        return {
            file: baseRoutesDir + "/" + file,
            name: file.split(".")[0]
        }
    })

    let activeModules = this.activeModules()

    if (activeModules.length > 0) {
        for (let i = 0; i < activeModules.length; i++) {
            let module = activeModules[i]
            let moduleRoutesDir = path.join(modulePath, module, "app", "routes")

            if (require("fs").existsSync(moduleRoutesDir)) {
                let moduleRoutesFiles = require("fs").readdirSync(moduleRoutesDir)

                moduleRoutesFiles = moduleRoutesFiles.map((file) => {
                    return {
                        file: moduleRoutesDir + "/" + file,
                        name: file.split(".")[0]
                    }
                })

                routesFiles = routesFiles.concat(moduleRoutesFiles)
            }
        }
    }

    routesFiles.forEach((file) => {
        const route = require(file.file)
        let routeName = file.name

        /**
         * If the route name is api, then remove it from the route name.
         * As api.route.js is the default route file.
         */
        routeName === "api" ? (routeName = "") : (routeName = routeName + "/")

        app.use(`/${routeName}`, route)
    })
}

/**
 * sequential processing, stops running a validation chain if the previous one has failed.
 * @param validations
 * @returns {function(*=, *=, *): Promise<*>}
 * @example
 *  const { validate } = require("../helpers/methods")
 *  const { indexValidator } = require("../middlewares/validators/index.validations")
 *  router.post("/", validate(indexValidator), IndexController.indexPost)
 */
exports.validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            if (result.errors.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(parseInt(process.env.VALIDATION_FAIL_CODE)).json({
            status: false,
            status_code: parseInt(process.env.VALIDATION_FAIL_CODE),
            message: "Validation failed",
            payload: errors.array()
        })
    }
}