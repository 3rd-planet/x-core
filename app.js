require("dotenv").config()
require("express-async-errors")
const { loadRoutes } = require("./helpers/methods")

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

/**
 * Create a new express app.
 */
const app = express()

/**
 * Enable helmet for all routes. You can change this to only allow specific origins.
 * See helmet documentation for more info.
 * @see https://www.npmjs.com/package/helmet
 */
app.use(helmet());

/**
 * Enable cors for all routes and origins. You can change this to only allow specific origins.
 * See cors documentation for more info.
 * @see https://www.npmjs.com/package/cors
 */
app.use(cors())

/**
 * Enable json body parsing for all routes. You can change this to only allow specific origins.
 * See express documentation for more info.
 * @see https://expressjs.com/en/api.html#express.json
 */
app.use(express.json())

/**
 * Load all routes from the routes folder.
 */
loadRoutes(app)

/**
 * Export the express app.
 * @type {Express}
 */
module.exports = app