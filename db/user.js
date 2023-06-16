import * as fs from "fs";
import { formatMoney } from "../utils/index.js";

const userInfoJSON = JSON.parse(fs.readFileSync("./db/files/userInfo.json"));

export const getUserInfo = () => {
  //TODO: Make a call to the database
  const userInfo = { ...userInfoJSON };
  userInfo.moneyAvailable = formatMoney(userInfo.moneyAvailable);

  return userInfo;
};
