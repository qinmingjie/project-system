const Router = require("@koa/router");
const { registerUserVerify, cryptoPassword } = require("../../middleware/user.middle");

const userRouter = new Router();

userRouter.post("/user", registerUserVerify, cryptoPassword);

module.exports = userRouter;
