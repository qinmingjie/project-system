const Router = require("@koa/router");
const { registerUserVerify, cryptoPassword, loginVerify } = require("../../middleware/user.middle");
const { createUser, loginToken, userAvatarInfo } = require("../../control/user.control");

const userRouter = new Router({ prefix: "/user" });

// 注册
userRouter.post("/register", registerUserVerify, cryptoPassword, createUser);
// 登录
userRouter.post("/login", loginVerify, loginToken);
// 获取用户头像
userRouter.get("/avatar/:user_id", userAvatarInfo);

module.exports = userRouter;
