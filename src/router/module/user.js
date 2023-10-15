const Router = require("@koa/router");
const { registerUserVerify } = require("../../middleware/user.middle");

const userRouter = new Router();

userRouter.post("/user", registerUserVerify);

module.exports = userRouter;
