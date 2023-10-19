const Router = require("@koa/router");

const { TokenVerify } = require("../../middleware/user.middle");
const { avatarHandler } = require("../../middleware/upload.middle");
const { savaAvatar } = require("../../control/upload.control");

const uploadRouter = new Router({ prefix: "/upload" });

// 上传头像
uploadRouter.post("/avatar", TokenVerify, avatarHandler, savaAvatar);

module.exports = uploadRouter;
