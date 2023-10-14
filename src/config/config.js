const dotenv = require("dotenv");

// 获取.env配置的环境变量
dotenv.config();
const { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_DATABASE, MYSQL_PASSWORd } = process.env;

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORd
};
