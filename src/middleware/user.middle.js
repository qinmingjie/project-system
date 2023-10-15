const { NAME_PASSWORD_IS_REQUIRED, NAME_IS_EXISTS, PASSWORD_RULES_ERROR } = require("../constant/error-type");
const { getUser } = require("../service/user.service");
const { cryptoMd5 } = require("../utils/tool");

// 通用验证(用户名密码非空及规则验证)
const commonVerify = async (nickname, password, ctx) => {
  const regx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // 1.非空验证
  if (!nickname || !password) {
    ctx.app.emit("error", NAME_PASSWORD_IS_REQUIRED, ctx);
    return;
  }

  // 2.密码规则校验
  if (!regx.test(password)) {
    ctx.app.emit("error", PASSWORD_RULES_ERROR, ctx);
    return;
  }
};

// 注册信息验证
const registerUserVerify = async (ctx, next) => {
  const { nickname, password } = ctx.request.body;
  await commonVerify(nickname, password, ctx);

  // 用户已存在
  try {
    const user = await getUser(nickname);
    if (user.length) {
      return ctx.app.emit("error", NAME_IS_EXISTS, ctx);
    }
  } catch (error) {
    return ctx.app.emit("error", { status: 500, message: error.message }, ctx);
  }

  await next();
};

// 加密密码
const cryptoPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = cryptoMd5(password);
  await next();
};

module.exports = {
  registerUserVerify,
  cryptoPassword
};
