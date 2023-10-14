const path = require("path");

const { getRecursiveDir } = require("../utils/tool");

const dirPath = path.resolve(__dirname, "./module");
// 注册路由函数
const registerRoutes = function () {
  const files = getRecursiveDir(dirPath, "files");
  files.forEach((file) => {
    const router = require(`./module/${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  });
};

module.exports = registerRoutes;
