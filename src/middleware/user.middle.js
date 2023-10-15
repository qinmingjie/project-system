const jwt = require("jsonwebtoken");

const {
  NAME_PASSWORD_IS_REQUIRED,
  NAME_IS_EXISTS,
  PASSWORD_RULES_ERROR,
  NAME_IS_NOT_EXISTS,
  PASSWORD_ERROR,
  AUTHOR_VOID
} = require("../constant/error-type");
const { getUser } = require("../service/user.service");
const { cryptoMd5 } = require("../utils/tool");
const { PUBLIC_KEY } = require("../config/config");

// 通用验证(用户名密码非空及规则验证)
const commonVerify = (nickname, password, ctx) => {
  const regx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // 1.非空验证
  if (!nickname || !password) {
    return !ctx.app.emit("error", NAME_PASSWORD_IS_REQUIRED, ctx);
  }

  // 2.密码规则校验
  if (!regx.test(password)) {
    return !ctx.app.emit("error", PASSWORD_RULES_ERROR, ctx);
  }

  return true;
};

// 注册信息验证
const registerUserVerify = async (ctx, next) => {
  const { nickname, password } = ctx.request.body;
  const isPass = commonVerify(nickname, password, ctx);
  if (!isPass) return;
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

// 登录信息验证
const loginVerify = async (ctx, next) => {
  const { nickname, password } = ctx.request.body;
  try {
    const isPass = commonVerify(nickname, password, ctx);
    if (!isPass) return;
    const user = await getUser(nickname);
    // 用户不存在
    if (!user.length) {
      return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
    }

    // 密码错误
    if (user[0].password !== cryptoMd5(password)) {
      return ctx.app.emit("error", PASSWORD_ERROR, ctx);
    }
    ctx.user = user[0];
  } catch (error) {
    ctx.app.emit("error", { status: 500, message: error.message }, ctx);
  }
  await next();
};

// 验证token
const verifyToken = async (ctx, next) => {
  const authorization = ctx.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  // 未携带token
  if (!token) {
    return ctx.app.emit("error", AUTHOR_VOID, ctx);
  }

  // 解密token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (error) {
    ctx.app.emit("error", AUTHOR_VOID, ctx);
  }
};

module.exports = {
  registerUserVerify,
  cryptoPassword,
  loginVerify,
  verifyToken
};
