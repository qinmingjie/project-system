const { asyncMysql } = require("../mysql/index");

class UserService {
  async getUser(nickname) {
    const statement = `SELECT * FROM user WHERE nickname = ?`;
    const result = await asyncMysql.execute(statement, [nickname]);
    return result[0];
  }
}

module.exports = new UserService();
