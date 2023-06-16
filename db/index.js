import * as fs from "fs";
const iconsJSON = JSON.parse(fs.readFileSync("./db/files/icons.json"));

export const getIcons = () => iconsJSON;
export * from "./user.js";
export * from "./transactions.js";
