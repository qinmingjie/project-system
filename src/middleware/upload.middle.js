const multer = require("@koa/multer");

const { AVATAR_PATH, PICTURE_PATH } = require("../config/config");

// 设置头像输出路径及上传时字段
const avatarMulter = multer({
  dest: AVATAR_PATH
});
const avatarHandler = avatarMulter.single("avatar");

// 设置图片上传路径及字段
const pictureMulter = multer({
  dest: PICTURE_PATH
});
const pictureHandler = pictureMulter.array("picture", 4);

module.exports = {
  avatarHandler,
  pictureHandler
};
