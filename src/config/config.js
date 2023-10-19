const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");

// 获取.env配置的环境变量
dotenv.config();
const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORd,
  AVATAR_PATH,
  PICTURE_PATH
} = process.env;

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "./public.key"));
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "./private.key"));

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORd,
  PUBLIC_KEY,
  PRIVATE_KEY,
  AVATAR_PATH,
  PICTURE_PATH
};
