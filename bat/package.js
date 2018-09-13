
// 将vue-ssr-client-manifest.json的async数据清空
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const { mkdirSync, deleteDirSync, copySync } = require("./util/file")
const { execSync, exec } = require("./util/cmd")
const { format } = require("./util/date")
const files = [
    "server.js",
    "n",
    "package.json",
    "index.template.html",
    "favicon.ico"
]

const srcDir = resolve("../")
const packageDir = resolve("./build")

const startTime = new Date().getTime();
console.log(execSync(" git pull  ", { cwd: srcDir }))
let result = exec(" npm run build ", { cwd: srcDir })
result.stdout.on('data', data => {
    console.log(data);
})
result.stderr.on('data', data => {
    console.log(data);
})
result.on('close', (code) => {
    if (code == 0) {
        deleteDirSync(packageDir)
        mkdirSync(packageDir)
        files.forEach(file => {
            const srcPath = path.resolve(srcDir, file);
            const dstPath = path.resolve(packageDir, file);
            copySync(srcPath, dstPath);
        });

        console.log(execSync(" git init & git add -A  ", { cwd: packageDir }))
        console.log(execSync(" git commit -m \"first commit\" ", { cwd: packageDir }))
        console.log(execSync(" git archive master --prefix=information_front/ --format=zip > ../information_front" + format(new Date(), "yyyy-MM-dd") + ".zip ", { cwd: packageDir }))
        console.log("打包时间：" + (new Date().getTime() - startTime) + "ms");
        setTimeout(() => {
            deleteDirSync(packageDir)
        }, 1000)
    }
});
