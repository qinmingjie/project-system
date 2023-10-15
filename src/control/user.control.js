const { insertUser } = require("../service/user.service");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/config");

class UserControl {
  async createUser(ctx, next) {
    const { nickname, password } = ctx.request.body;
    try {
      const res = await insertUser(nickname, password);
      if (res.length) {
        ctx.body = {
          status: 200,
          message: "注册成功!"
        };
      }
    } catch (error) {
      ctx.app.emit("error", { status: 500, message: error.message }, ctx);
    }
    await next();
  }
  loginToken(ctx) {
    const { id, nickname, password } = ctx.user;
    try {
      const token = jwt.sign({ id, nickname, password }, PRIVATE_KEY, {
        expiresIn: "3 days",
        algorithm: "RS256"
      });
      ctx.body = {
        status: 200,
        id,
        nickname,
        token
      };
    } catch (error) {
      ctx.app.emit("error", { status: 500, message: error.message }, ctx);
    }
  }
}

module.exports = new UserControl();
