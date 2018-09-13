// 将vue-ssr-client-manifest.json的async数据清空
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
let fs = require('fs');
let result = JSON.parse(fs.readFileSync(resolve("../n/dist/information-vue-ssr-client-manifest.json")));
result.async = [];
fs.writeFileSync(resolve("../n/dist/information-vue-ssr-client-manifest.json"), JSON.stringify(result));
