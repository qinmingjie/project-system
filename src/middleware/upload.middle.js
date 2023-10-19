const multer = require("@koa/multer");

const { AVATAR_PATH } = require("../config/config");

const avatarMulter = multer({
  dest: AVATAR_PATH
});

const avatarHandler = avatarMulter.single("avatar");

module.exports = {
  avatarHandler
};
