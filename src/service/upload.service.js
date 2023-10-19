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
  // 插入图片
  async insertPicture({ filename, size, mimetype, user_id }) {
    const statement = `
        INSERT INTO picture (filename, size, mimetype, user_id)
        VALUES (?,?,?,?)
    `;
    return await asyncMysql.execute(statement, [filename, size, mimetype, user_id]);
  }
  // 获取用户头像
  async getUserAvatarById(user_id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?`;
    const [result] = await asyncMysql.execute(statement, [user_id]);
    return result;
  }
}

module.exports = new UploadService();
