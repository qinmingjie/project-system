const Router = require("@koa/router");

const { TokenVerify } = require("../../middleware/user.middle");
const { avatarHandler } = require("../../middleware/upload.middle");

const uploadRouter = new Router({ prefix: "/upload" });

// 上传头像
uploadRouter.post("/avatar", TokenVerify, avatarHandler);

module.exports = uploadRouter;
