const { insertAvatar, deleteUserOtherAvatar, insertPicture } = require("../service/upload.service");

class UploadControl {
  // 保存头像
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
        message: "上传成功!"
      };
    } catch (error) {
      ctx.app.emit("error", { status: 500, message: error.message }, ctx);
    }
  }
  // 保存图片
  async savePicture(ctx) {
    // 获取图片，用户信息
    const files = ctx.request.files;
    const { id } = ctx.user;
    // 保存上传图片信息至数据库
    try {
      for (let file of files) {
        const { filename, mimetype, size } = file;
        await insertPicture({ filename, mimetype, size, user_id: id });
      }
      ctx.body = {
        status: 200,
        message: "上传成功!"
      };
    } catch (error) {
      ctx.app.emit("error", { status: 500, message: error.message }, ctx);
    }
  }
}

module.exports = new UploadControl();
