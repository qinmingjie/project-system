const { asyncMysql } = require("../mysql/index");
class UploadService {
  async insertAvatar({ filename, size, mimetype, user_id }) {
    const statement = `
        INSERT INTO (filename, size, mimetype, user_id)
        VALUES (?,?,?,?)
    `;
    return await asyncMysql.execute(statement, [filename, size, mimetype, user_id]);
  }
}

module.exports = new UploadService();
