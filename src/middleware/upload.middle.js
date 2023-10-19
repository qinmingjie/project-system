const multer = require("@koa/multer");

const { AVATAR_PATH } = require("../config/config");

// 设置头像输出路径及命名规则
const avatarMulter = multer({
  dest: AVATAR_PATH
});

const avatarHandler = avatarMulter.single("avatar");

module.exports = {
  avatarHandler
};
