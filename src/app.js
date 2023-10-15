const Koa = require("koa");
const router = require("./router/index");
const { APP_PORT = 3000 } = require("./config/config");
const { mysqlConnectionVify } = require("./middleware/mysql.middle");
const { handleCumtomError } = require("./utils/tool");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(bodyParser());
router.call(app);
app.use(mysqlConnectionVify);
app.on("error", handleCumtomError);

app.listen(APP_PORT, () => {
  console.log(`The server runs on port ${APP_PORT}`);
});
