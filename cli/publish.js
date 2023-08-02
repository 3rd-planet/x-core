const fs = require("fs")
const path = require("path")
const { rootPath } = require("../paths")

/**
 *
 * @returns {Promise<void>}
 */
exports.publishStubs = async () => {
    const stubsPath = path.join(rootPath, "stubs")

    if (!fs.existsSync(stubsPath)) {
        fs.mkdirSync(stubsPath, { recursive: true })
    }

    const stubs = fs.readdirSync(path.join(__dirname, "../stubs"))

    stubs.forEach((stub) => {
        const filePath = path.join(stubsPath, stub)

        if (!fs.existsSync(filePath)) {
            const stubFile = fs.readFileSync(path.join(__dirname, "../stubs/" + stub), "utf8")

            fs.writeFile(filePath, stubFile, (err) => {
                if (err) {
                    console.log(err)

                    return false
                }

                return true
            })
        }
    })
}