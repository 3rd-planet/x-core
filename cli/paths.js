const paths = require("path")
const fs = require("fs")

//let rootPath = paths.join(__dirname, "..", "..", "..")
let rootPath = paths.join(__dirname, "..", "..", "framework-x")

console.log("Root Directory: ", rootPath)

const rootDirectory = rootPath

exports.rootPath = rootDirectory
exports.appPath = paths.join(rootDirectory, "app")
exports.modulePath = paths.join(rootDirectory, "modules")
exports.packagePath = paths.join(rootDirectory, "node_modules/@3rdplanet/x-core")
