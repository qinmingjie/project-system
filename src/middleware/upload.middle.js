const path = require("path");
const multer = require("@koa/multer");

const { AVATAR_PATH } = require("../config/config");

const avatarMulter = multer({
  dest: path.join(process.cwd(), AVATAR_PATH)
});

const avatarHandler = avatarMulter.single("avatar");

// const handleFile = async (ctx, next) => {
//   console.log(ctx.user);
// };

module.exports = {
  avatarHandler
};
