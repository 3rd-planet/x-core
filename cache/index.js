const { createClient } = require("redis")
const {
    CACHE_EXPIRE_TIME,
    CACHE_UPDATE_INTERVAL,
    CACHE_ENABLED,
    CACHE_KEY_PREFIX
} = require("../helpers/constants")

/**
 * Check if the cache is enabled.
 * @returns {boolean}
 *
 * @example
 * isCacheEnabled()
 * // true || false
 */
exports.isCacheEnabled = () => {
    return CACHE_ENABLED === "true"
}

/**
 * Get cache update interval.
 * @returns {*}
 *
 * @example
 * cacheUpdateInterval()
 * // 60000
 */
exports.cacheUpdateInterval = () => {
    return CACHE_UPDATE_INTERVAL
}

exports.prepareCacheKey = (key) => {
    return CACHE_KEY_PREFIX + "-" + key
}

/**
 * Get cache client.
 * @returns {Promise<>}
 *
 * @example
 * getCacheClient()
 * // RedisClient {}
 */
exports.getCacheClient = async (config = null) => {

    let redisConfig = config ? config : {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        database: process.env.REDIS_DB
    }

    const client = createClient(redisConfig)
    client.on("error", (err) => console.log("Redis Client Error", err))
    await client.connect()

    return client
}

/**
 * Get cache data.
 * @param key
 * @param updateAccess
 * @returns {Promise<any|null>}
 *
 * @example
 * getCache("key")
 *
 */
exports.getCache = async (key, updateAccess = true) => {
    if (!this.isCacheEnabled()) return null

    const client = await this.getCacheClient()
    const cache = await client.get(key)

    if (!cache) return null

    let jsonParsedCache = JSON.parse(cache)

    if (updateAccess) this.updateCacheAccess(jsonParsedCache)

    client.disconnect()

    return jsonParsedCache
}

/**
 * Set cache data.
 * @param key
 * @param response
 * @returns {{last_updated: Date, last_accessed: Date, response, key}}
 *
 * @example
 * setCacheData("key", "response")
 */
exports.setCacheData = (key, response) => {
    return {
        key: key,
        response: response,
        last_accessed: new Date(),
        last_updated: new Date()
    }
}

/**
 * Set cache.
 * @param key
 * @param value
 * @param updater
 * @returns {Promise<void>}
 */
exports.setCache = async (key, value, updater = null) => {
    if (!this.isCacheEnabled()) return

    const client = await this.getCacheClient()
    await client.set(key, JSON.stringify(this.setCacheData(key, value)))

    if (updater) this.setUpdater(key, updater.function, updater.params)

    client.disconnect()
}

/**
 * Update cache.
 * @param cache
 * @returns {Promise<void>}
 */
exports.reUpdateCache = async (cache) => {
    const client = await this.getCacheClient()
    await client.set(cache.key, JSON.stringify(cache))
    client.disconnect()
}

/**
 * Update cache access.
 * @param cache
 * @returns {void}
 *
 * @example
 * updateCacheAccess(cache)
 */
exports.updateCacheAccess = async (cache) => {
    cache.last_accessed = new Date()
    await this.reUpdateCache(cache)
}

/**
 * Update cache response.
 * @param cache
 * @param response
 * @returns {Promise<void>}
 *
 * @example
 * updateCacheResponse(cache, response)
 */
exports.updateCacheResponse = async (cache, response) => {
    if (!cache) return

    cache.last_updated = new Date()
    cache.response = response

    await this.reUpdateCache(cache)
}

/**
 * Check if cache is eligible for delete.
 * @param cache
 * @returns {boolean}
 *
 * @example
 * eligibleForDelete(cache)
 * // true || false
 */
exports.eligibleForDelete = (cache) => {
    return new Date() - new Date(cache.last_accessed) > CACHE_EXPIRE_TIME
}

/**
 * Check if cache is eligible for update.
 * @param cache
 * @returns {Promise<*|null>}
 *
 * @example
 * eligibleForUpdate(cache)
 * // cache || null
 */
exports.eligibleForUpdate = async (cache) => {
    if (!cache) return null

    if (this.eligibleForDelete(cache)) {
        await this.deleteCache(cache)

        return null
    }

    return cache
}

/**
 * Set cache updater.
 * @param key
 * @param updaterFunction
 * @param parameters
 *
 * @example
 * setUpdater("key", updaterFunction, [1, 2, 3, 4, 5, 6])
 */
exports.setUpdater = (key, updaterFunction, parameters) => {
    let cacheUpdater = setInterval(async () => {
        let cache = await this.eligibleForUpdate(await this.getCache(key, false))

        if (!cache) clearInterval(cacheUpdater)

        await this.updateCacheResponse(cache, await updaterFunction(...parameters))
    }, this.cacheUpdateInterval())
}

/**
 * Delete cache.
 * @param cache
 * @returns {Promise<void>}
 *
 * @example
 * deleteCache(cache)
 *
 */
exports.deleteCache = async (cache) => {
    const client = await this.getCacheClient()
    await client.del(cache.key)
    client.disconnect()
}
