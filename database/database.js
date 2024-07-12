
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { GoodDB, JSONDriver } = require("good.db");
/**
 ** That's will help you to use database.
@param
 */
const db = new GoodDB(
  new JSONDriver({ path: "database/DATA/data.json", format:true })
);

//reader.
module.exports = db; 

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/