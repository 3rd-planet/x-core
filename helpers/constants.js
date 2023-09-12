const { rootPath } = require("../paths")
let packageJson = require(rootPath + "../package.json")

exports.CACHE_ENABLED = process.env.CACHE_ENABLED
exports.CACHE_UPDATE_INTERVAL = process.env.CACHE_UPDATE_INTERVAL
exports.CACHE_EXPIRE_TIME = process.env.CACHE_EXPIRE_TIME
exports.CACHE_KEY_PREFIX = packageJson.name


exports.REDIS_HOST = process.env.REDIS_HOST
exports.REDIS_PORT = process.env.REDIS_PORT
exports.REDIS_USERNAME = process.env.REDIS_USERNAME
exports.REDIS_PASSWORD = process.env.REDIS_PASSWORD
exports.REDIS_DB = process.env.REDIS_DB

