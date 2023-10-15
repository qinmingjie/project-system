const fs = require("fs");
const path = require("path");
const { mysql } = require("../mysql/index");

// 数据库连接验证
const mysqlConnectionVify = async (ctx, next) => {
  const promise = function () {
    return new Promise((reslove) => {
      mysql.getConnection((err, success) => {
        // 连接失败
        if (err) {
          ctx.app.emit("error", { status: 500, message: err.message }, ctx);
          reslove();
        }
        // 连接成功写入sql
        if (success) {
          const initSql = fs.readFileSync(path.join(__dirname, "../mysql/init.sql"), { encoding: "utf-8" });
          mysql.query(initSql, async (err) => {
            err && ctx.app.emit("error", { status: 500, message: err.message }, ctx);
            reslove();
          });
        }
      });
    });
  };
  await promise();
  await next();
};

module.exports = {
  mysqlConnectionVify
};
