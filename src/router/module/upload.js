const Router = require("@koa/router");

const { TokenVerify } = require("../../middleware/user.middle");
const { avatarHandler, pictureHandler } = require("../../middleware/upload.middle");
const { savaAvatar, savePicture } = require("../../control/upload.control");

const uploadRouter = new Router({ prefix: "/upload" });

// 上传头像
uploadRouter.post("/avatar", TokenVerify, avatarHandler, savaAvatar);
// 上传图片
uploadRouter.post("/picture", TokenVerify, pictureHandler, savePicture);

module.exports = uploadRouter;
