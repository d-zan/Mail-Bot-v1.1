
const { GoodDB, JSONDriver } = require("good.db");
/**
 * JSON
 */
const db = new GoodDB(
  new JSONDriver({ path: "database/DATA/data.json", format:true })
);

module.exports = db; 