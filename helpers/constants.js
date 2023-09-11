const { rootPath } = require("../paths")
let packageJson = require(rootPath + "../package.json")

exports.CACHE_ENABLED = process.env.CACHE_ENABLED
exports.CACHE_EXPIRE_TIME = process.env.CACHE_EXPIRE_TIME
exports.CACHE_UPDATE_INTERVAL = process.env.CACHE_UPDATE_INTERVAL
exports.CACHE_KEY_PREFIX = packageJson.name