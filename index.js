import express from "express";
import { create } from "express-handlebars";
import { getUserInfo, getTransactions } from "./db/index.js";
import bodyParser from "body-parser";

// Routes
import transactionsRouter from "./routes/transactions.js";

const hbs = create({
  helpers: {
    ifEquals(arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
  },
});

const app = express();
app.use(bodyParser.json());
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public/"));

app.get("/", (_req, res) => {
  const userInfo = getUserInfo();
  res.render("home", {
    ...userInfo,
    transactions: getTransactions(),
  });
});

app.use("/transactions", transactionsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
