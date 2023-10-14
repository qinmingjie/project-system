const Koa = require("koa");

const app = new Koa();
const { APP_PORT = 3000 } = require("./config/config");

app.listen(APP_PORT, () => {
  console.log(`The server runs on port ${APP_PORT}`);
});
