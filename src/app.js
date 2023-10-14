const Koa = require("koa");

const app = new Koa();

app.listen(3000, () => {
  console.log("The server runs on port 3000");
});
