const util = require("util")
const exec = util.promisify(require("child_process").exec)
const packageJson = require("./package.json")

const runCmd = async (command) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { stdout, stderr } = await exec(command)
    } catch (error) {
        console.log("\x1b[31m", error.message, "\x1b[0m")
    }
}

const publish = async () => {
    let v = "v" + packageJson.version
    console.log(v)

    let gitAdd = 'git add . && git commit -m "' + v + '"'
    console.log(gitAdd)
    await runCmd(gitAdd)

    let gitTag = "git tag -a " + v + ' -m "' + v + '"'
    console.log(gitTag)
    await runCmd(gitTag)

    let gitPush = "git push"
    console.log(gitPush)
    await runCmd(gitPush)

    let gitPushTag = "git push origin --tag"
    console.log(gitPushTag)
    await runCmd(gitPushTag)

    let npmPublish = "npm publish"
    console.log(npmPublish)
    await runCmd(npmPublish)
}

publish().then(() => {
    console.log("published....")
})
