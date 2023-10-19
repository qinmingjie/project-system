const { asyncMysql } = require("../mysql/index");

class UserService {
  // 根据用户名获取用户信息
  async getUser(nickname) {
    const statement = `SELECT * FROM user WHERE nickname = ?`;
    const result = await asyncMysql.execute(statement, [nickname]);
    return result[0];
  }
  // 插入用户
  async insertUser(nickname, password) {
    const statement = `INSERT INTO user (nickname, password) VALUES (?, ?)`;
    return await asyncMysql.execute(statement, [nickname, password]);
  }
  // 更新用户信息
  async updateUser(params, user_id) {
    let updateStr = "";
    let updateVal = [];
    for (let key in params) {
      updateStr += `${key} = ?,`;
      updateVal.push(params[key]);
    }
    updateVal.push(user_id);
    const statement = `UPDATE user SET ${updateStr.slice(0, -1)} WHERE id = ?`;
    return await asyncMysql.execute(statement, updateVal);
  }
}

module.exports = new UserService();
