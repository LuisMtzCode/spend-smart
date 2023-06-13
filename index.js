import express from "express";
import { engine } from "express-handlebars";
import { getUserInfo, getIcons } from "./db/index.js";

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public/"));

app.get("/", (_req, res) => {
  const userInfo = getUserInfo();
  res.render("home", {
    ...userInfo,
  });
});

app.get("/add",    (_req, res) => {
  const userInfo = getUserInfo();
  const icons = getIcons();

  res.render("add", {
    ...userInfo,
    icons,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
