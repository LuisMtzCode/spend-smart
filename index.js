import express from "express";
import { create } from "express-handlebars";
import {
  getUserInfo,
  getExpensesCategories,
  getTransactions,
} from "./db/index.js";
import bodyParser from "body-parser";

// Routes
import transactionsRouter from "./routes/transactions.js";

const hbs = create({
  helpers: {
    ifEquals(arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
    isExpense(arg1) {
      return arg1.amount < 0;
    },
    isExpenseClassname(arg1, _options) {
      return arg1.amount < 0 ? "expense" : "income";
    },
  },
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public/"));

app.get("/", async (req, res) => {
  const queryParams = req.query;
  const userInfo = await getUserInfo();

  res.render("home", {
    ...userInfo,
    expensesCategories: await getExpensesCategories(),
    transactions: await getTransactions(queryParams),
  });
});

app.use("/transactions", transactionsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
