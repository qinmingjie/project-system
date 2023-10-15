const NAME_PASSWORD_IS_REQUIRED = {
  status: 400,
  message: "用户名和密码为必填项!"
};
const NAME_IS_EXISTS = {
  status: 400,
  message: "用户名已存在!"
};
const PASSWORD_RULES_ERROR = {
  status: 400,
  message: "密码不符合规范,长度为6-16,至少一个大写和小写字母,至少一个特殊符号(!@#$%^&*)"
};
module.exports = {
  NAME_PASSWORD_IS_REQUIRED,
  NAME_IS_EXISTS,
  PASSWORD_RULES_ERROR
};
