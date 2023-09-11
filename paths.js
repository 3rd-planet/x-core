const path = require("path")
const { dirname } = require("path")
const appDir = dirname(require.main.filename)

exports.rootPath = path.join(appDir + "/")
exports.packagePath = path.join(appDir, "/node_modules/@3rdplanet/x-core/")
exports.appPath = path.join(appDir, "/app/")
