const path = require("path")
const fs = require("fs")

console.log("Root Directory: ", require("process").env.npm_config_local_prefix)

const rootDirectory = path.join(require("process").env.npm_config_local_prefix, "/")

exports.rootPath = rootDirectory
exports.packagePath = path.join(rootDirectory, "node_modules/@3rdplanet/x-core")
exports.appPath = path.join(rootDirectory, "app")
exports.modulePath = path.join(rootDirectory, "modules")
