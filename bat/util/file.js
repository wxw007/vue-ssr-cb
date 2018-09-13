const fs = require('fs')


/**
 * 不存在时， 则创建目录
 */
const mkdirSync = (path) => {
    if (!fs.existsSync(path)) {
        return fs.mkdirSync(path)
    }
    return null;
}

/**
 *  复制文件或文件夹
 */
const copySync = (src, dst) => {
    let st = fs.statSync(src)
    if (st.isFile()) {
        fs.copyFileSync(src, dst)
        // // 创建读取流
        // let readable = fs.createReadStream(src);
        // // 创建写入流
        // let writable = fs.createWriteStream(dst);
        // // 通过管道来传输流
        // readable.pipe(writable);
        return;
    }

    mkdirSync(dst);
    let paths = fs.readdirSync(src);
    paths.forEach(path => {
        let _src = src + '/' + path,
            _dst = dst + '/' + path;
        let st = fs.statSync(_src)
        // 判断是否为文件
        if (st.isFile()) {
            fs.copyFileSync(_src, _dst)
        } else if (st.isDirectory()) { // 如果是目录则递归调用自身
            copySync(_src, _dst)
        }
    })
};

/**
 * 删除目录
 */
const deleteDirSync = (path) => {
    var files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(function (file, index) {
            var curPath = path + "/" + file
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteDirSync(curPath)
            } else { // delete file
                fs.unlinkSync(curPath)
            }
        });
        fs.rmdirSync(path)
    }
}

module.exports = { mkdirSync, copySync, deleteDirSync }
