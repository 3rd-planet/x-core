const paths = require("path")
const fs = require("fs")

// production
//let rootPath = paths.join(__dirname, "..", "..", "..")

// development
let rootPath = paths.join(__dirname, "..", "..", "framework-x")

const rootDirectory = rootPath

exports.rootPath = rootDirectory
exports.appPath = paths.join(rootDirectory, "app")
exports.modulePath = paths.join(rootDirectory, "modules")
exports.packagePath = paths.join(rootDirectory, "node_modules/@3rdplanet/x-core")
