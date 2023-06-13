import { formatMoney } from "../utils/index.js";

// TODO: Delete these lines after you have created your database
import userInfoJSON from "./userInfo.json" assert { type: "json" };
import iconsJSON from "./icons.json" assert { type: "json" };

export const getUserInfo = () => {
  //TODO: Make a call to the database
  const userInfo = { ...userInfoJSON };
  userInfo.moneyAvailable = formatMoney(userInfo.moneyAvailable);

  return userInfo;
};

export const getIcons = () => iconsJSON;
