const fs = require("fs");

const { insertUser } = require("../service/user.service");
const { getUserAvatarById } = require("../service/upload.service");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, AVATAR_PATH } = require("../config/config");

class UserControl {
  // 创建用户
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
  // 登录token
  async loginToken(ctx) {
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
  // 用户头像
  async userAvatarInfo(ctx) {
    const { user_id } = ctx.params;
    try {
      const [avatarInfo] = await getUserAvatarById(user_id);
      ctx.response.set("content-type", avatarInfo.mimetype);
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    } catch (error) {
      ctx.app.emit("error", { status: 500, message: error.message }, ctx);
    }
  }
}

module.exports = new UserControl();
