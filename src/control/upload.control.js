const { insertAvatar, deleteUserOtherAvatar } = require("../service/upload.service");

class UploadControl {
  async savaAvatar(ctx) {
    // 获取图片，用户信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    // 将图片信息保存至数据库并删除旧的头像
    try {
      const result = await insertAvatar({ filename, mimetype, size, user_id: id });
      if (result.length) {
        await deleteUserOtherAvatar({ user_id: id, filename });
      }
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
