const { insertAvatar } = require("../service/upload.service");

class UploadControl {
  async savaAvatar(ctx) {
    // 获取图片，用户信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    // 将图片信息保存至数据库
    try {
      await insertAvatar({ filename, mimetype, size, user_id: id });
      ctx.body = {
        status: 200,
        message: "上传成功"
      };
    } catch (error) {
      ctx.app.emit("error", { status: 500, message: error.message }, ctx);
    }
  }
}

module.exports = new UploadControl();
