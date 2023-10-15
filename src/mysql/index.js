const mysql = require("mysql2");

const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORd } = require("../config/config");

// 创建连接池
const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORd,
  connectionLimit: 20
});

module.exports = { mysql: connection, asyncMysql: connection.promise() };
