const { asyncMysql } = require("../mysql/index");

class UserService {
  async getUser(nickname) {
    const statement = `SELECT * FROM user WHERE nickname = ?`;
    const result = await asyncMysql.execute(statement, [nickname]);
    return result[0];
  }
  async insertUser(nickname, password) {
    const statement = `INSERT INTO user (nickname, password) VALUES (?, ?)`;
    return await asyncMysql.execute(statement, [nickname, password]);
  }
}

module.exports = new UserService();
