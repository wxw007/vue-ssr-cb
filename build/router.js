// 路由自动生成

const fs = require('fs'),
    statSync = fs.statSync;
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const { format } = require("../bat/util/date")
const { execSync } = require("../bat/util/cmd")

const srcDir = resolve("../src").replace(new RegExp("\\\\", "g"), "/"); // 源文件目录
const routerPageDir = srcDir + "/views";// 路由页面文件目录
const routerPath = srcDir + "/router/index.js";// 路由文件路径


/**
 * 判断是否vue文件
 * 
 * @param {String} filePath 文件路径
 */
const isVueFile = function (filePath) {
    return /^.*\.(vue)$/.test(filePath);
}

/**
 * 判断是否url文件
 * 
 * @param {String} filePath 文件路径
 */
const isUrlFile = function (filePath) {
    return /^.*\.(url)$/.test(filePath);
}

/**
 * 计算vue文件的路由
 * 
 * @param {String} vueFilePath vue文件路径
 * @param {String} routerPageDir  路由页面文件目录
 */
const getRoutePath = function (vueFilePath, routerPageDir) {
    let relativePath = vueFilePath.replace(routerPageDir, "");
    let url = relativePath.replace("/index.vue", "").replace(new RegExp("_", "g"), ":").replace(".vue", "").replace("/index.url", "").replace(".url", "");
    if(url == ''){
        return "/"
    }
    return  url;
};

/**
 * 计算 import 路径
 */
const getImportPath = function (vueFilePath) {
    return "() => import(\"" + vueFilePath.replace(srcDir, "@") + "\")";
}

const getRoute = function (filePath) {
    let routePath = getRoutePath(filePath, routerPageDir);
    let importPath = getImportPath(filePath);
    // routes.push({ path: routePath, component: importPath });
    let route = { path: routePath, component: importPath };

    const childDir = filePath.replace(".vue", "");
    // 存在嵌套路由
    let exists = fs.existsSync(childDir);
    if (exists) {
        let tempRoutes = generate(childDir);
        if (tempRoutes.length > 0) {
            route.children = [];
            tempRoutes.forEach(({ path, component }) => {
                if (path.indexOf(route.path + "/") == 0) {
                    let childPath = path.replace(route.path + "/", "");
                    if (childPath.indexOf("index/") == 0) {
                        childPath = childPath.replace("index/", "");
                    }
                    if (childPath.indexOf("index") == 0) {
                        childPath = childPath.replace("index", "");
                    }
                    route.children.push({ path: childPath, component });
                } else if (path.indexOf(route.path) == 0) {
                    let childPath = path.replace(route.path, "");
                    if (childPath.indexOf("index/") == 0) {
                        childPath = childPath.replace("index/", "");
                    }
                    if (childPath.indexOf("index") == 0) {
                        childPath = childPath.replace("index", "");
                    }
                    route.children.push({ path: childPath, component });
                }
            });
        }
    }
    return route;
}


const isMatch = function (path) {
    try {
        let routerConfig = JSON.parse(fs.readFileSync(resolve("./router-config.json")))
        if (routerConfig.paths.length == 0) {
            return true;
        }
        for (let i = 0; i < routerConfig.paths.length; i++) {
            if (RegExp(routerConfig.paths[i]).test(path)) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}
/**
 * 根据文件路径生成路由
 * 
 * @param {String} pageDir 路由文件目录
 */
const generate = function (pageDir) {
    let paths = fs.readdirSync(pageDir);
    const fileRoutes = [];
    const dirRoutes = [];
    paths.forEach(function (path) {
        if (path === "base") {
            return;
        }
        let filePath = pageDir + '/' + path;
        let st = statSync(filePath);
        if (st.isFile()) {
            if (isVueFile(filePath)) {
                let route = getRoute(filePath);
                if (isMatch(route.path)) {
                    fileRoutes.push(route);
                }
                return;
            }
            // .url.js 返回一个函数计算
            // if (isUrlFile(filePath)) {
            //     let url = fs.readFileSync(filePath).trim();
            //     let route = getRoute(filePath.replace(".url", ".vue"));
            // }
        } else if (st.isDirectory()) {
            // 存在嵌套路由
            let exists = fs.existsSync(filePath + ".vue");
            if (exists) {
                return;
            }


            let tempRoutes = generate(filePath);
            tempRoutes.forEach(route => {
                dirRoutes.push(route);
            })
        }
    })
    const routes = [];
    fileRoutes.forEach(route => {
        routes.push(route);
    });
    dirRoutes.forEach(route => {
        routes.push(route);
    });
    return routes;
};

const getRouteStr = function (routes, depth) {
    let indentStr = "\n" + "\t".repeat(depth);
    let routeStr = "[" + indentStr;
    routes.forEach(({ path, component, children }) => {
        if (children) {
            let indentStr2 = "\n" + "\t".repeat(depth + 1);

            routeStr += "{" + indentStr2 + "path: \"" + path + "\", " + indentStr2 + "component: " + component + "," + indentStr2 +
                "children: ";
            let childRouteStr = getRouteStr(children, depth + 2);
            routeStr += childRouteStr + indentStr + "}," + indentStr;
        } else {
            routeStr += "{ path: \"" + path + "\", component: " + component + " }," + indentStr;
        }
    });
    routeStr += "]";
    // return routeStr;
    return routeStr.replace("," + indentStr + "]", "\n" + "\t".repeat(depth - 1) + "]");
}

const writeRoute = function (routes) {
    let routeStr = "const routes = " + getRouteStr(routes, 1) + ";";
    fs.readFile(routerPath, 'utf-8', function (err, data) {
        if (err) {
            console.log("error");
        } else {
            // console.log(routeStr)
            let content = data.replace(new RegExp("//\\s+inject\\s+start\\s+[\\s\\S]*?//\\s+inject\\s+end"),
                "// inject start\n" + routeStr + "\n// inject end");
            if (data === content) {
                return;
            }
            console.log("route is change");
            fs.writeFileSync(routerPath, content, "utf-8");
        }
    });

}

const main = function () {
    const routes = generate(routerPageDir);
    writeRoute(routes);
}

const username = execSync(" git config --global user.name", { cwd: resolve("../") }).trim();
main();
fs.watch(routerPageDir, { recursive: true }, (event, filename) => {
    if (event === "change") {
        return;
    }
    const path = routerPageDir + "/" + filename;
    if (path.indexOf(".vue") < 0) {
        return;
    }
    let exists = fs.existsSync(path);
    if (exists) {
        const st = fs.statSync(path)
        if (st.isDirectory()) {
            return;
        }
        let content = fs.readFileSync(path, 'utf-8');
        if (content.trim().length == 0) {
            fs.writeFileSync(path, fs.readFileSync(resolve("./vue.template"), 'utf-8').replace("${date}", format(new Date(), "yyyy-MM-dd hh:mm")).replace("${author}", username), "utf-8");
        }
    }

    if (filename) {
        main();
    } else {
        console.log('filename not provided');
    }
});


fs.watch(resolve("./router-config.json"), (event, filename) => {
    main();
});

