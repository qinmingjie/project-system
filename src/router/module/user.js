const Router = require("@koa/router");
const { registerUserVerify, cryptoPassword } = require("../../middleware/user.middle");
const { createUser } = require("../../control/user.control");

const userRouter = new Router();

userRouter.post("/user", registerUserVerify, cryptoPassword, createUser);

module.exports = userRouter;
