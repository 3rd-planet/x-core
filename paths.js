const path = require("path")
let rootPath = path.join(path.resolve(), path.sep)

exports.rootPath = rootPath
exports.packagePath = path.join(rootPath, "node_modules", "@3rdplanet", "x-core", path.sep)
exports.appPath = path.join(rootPath, "app", path.sep)
exports.modulePath = path.join(rootPath, "modules", path.sep)
