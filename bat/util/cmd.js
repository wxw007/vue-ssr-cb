const child_process = require('child_process')
const execSync = (cmd, { cwd }) => {
    return child_process.execSync(cmd, {
        cwd,
        maxBuffer: 10000 * 1024,
        encoding: "utf8"
    });
}
const exec = (cmd, { cwd }) => {
    return child_process.exec(cmd, {
        cwd,
        maxBuffer: 10000 * 1024,
        encoding: "utf8"
    });
}
module.exports = { execSync, exec };