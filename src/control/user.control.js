const { insertUser } = require("../service/user.service");
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
}

module.exports = new UserControl();
