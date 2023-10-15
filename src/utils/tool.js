const path = require("path");
const fs = require("fs");

// 获取文件夹下所有文件夹或者文件名称
function getRecursiveDir(dirPath, type = "directory", res = []) {
  let files = [];
  try {
    files = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (error) {
    console.log(error);
    return;
  }

  files.forEach((item) => {
    // 如果是文件夹则放入_dirs中，在递归调用下一层文件
    if (item.isDirectory()) {
      type === "directory" && res.push(item.name);
      getRecursiveDir(path.join(dirPath, item.name), type, res);
    }
    // 如果是文件则放入_files中
    item.isFile() && type === "files" && res.push(item.name);
  });
  return res;
}

// 自定义错误处理
function handleCumtomError({ status = 404, message = "NOT FOUND" }, ctx) {
  ctx.status = status;
  ctx.body = { status, message };
}

module.exports = {
  getRecursiveDir,
  handleCumtomError
};
