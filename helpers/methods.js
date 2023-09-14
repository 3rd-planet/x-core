const path = require("path")
const { appPath, rootPath, modulePath } = require("../paths")
const packageJson = require(rootPath + "package.json")
const activeModules = packageJson.xconfig.modules

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
