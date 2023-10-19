const { asyncMysql } = require("../mysql/index");
class UploadService {
  // 插入头像数据
  async insertAvatar({ filename, size, mimetype, user_id }) {
    const statement = `
        INSERT INTO avatar (filename, size, mimetype, user_id)
        VALUES (?,?,?,?)
    `;
    return await asyncMysql.execute(statement, [filename, size, mimetype, user_id]);
  }
  // 删除旧的头像数据
  async deleteUserOtherAvatar({ filename, user_id }) {
    const statement = `
        DELETE FROM avatar WHERE filename != ? AND user_id = ?;
    `;
    return await asyncMysql.execute(statement, [filename, user_id]);
  }
}

module.exports = new UploadService();
