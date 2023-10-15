const Router = require("@koa/router");
const { registerUserVerify, cryptoPassword, loginVerify, verifyToken } = require("../../middleware/user.middle");
const { createUser, loginToken } = require("../../control/user.control");

const userRouter = new Router();

userRouter.post("/user", registerUserVerify, cryptoPassword, createUser);
userRouter.post("/login", loginVerify, loginToken);
userRouter.get("/verify", verifyToken);

module.exports = userRouter;
