import { formatMoney } from "../utils/index.js";

import * as fs from "fs";
const userInfoJSON = JSON.parse(fs.readFileSync("./db/userInfo.json"));
const iconsJSON = JSON.parse(fs.readFileSync("./db/icons.json"));

export const getUserInfo = () => {
  //TODO: Make a call to the database
  const userInfo = { ...userInfoJSON };
  userInfo.moneyAvailable = formatMoney(userInfo.moneyAvailable);

  return userInfo;
};

export const getIcons = () => iconsJSON;
