const path = require("path")
const rootDirectory = path.join(require("app-root-path").path, "/")

exports.rootPath = rootDirectory
exports.packagePath = path.join(rootDirectory, "node_modules/@3rdplanet/x-core")
exports.appPath = path.join(rootDirectory, "app")
exports.modulePath = path.join(rootDirectory, "modules")
