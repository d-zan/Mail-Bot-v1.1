
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { GoodDB, JSONDriver } = require("good.db");
/**
 @param if you developer That's will help you to use database. 
 */
const blacklist = new GoodDB(
  new JSONDriver({ path: "database/DATA/blacklist.json", format:true })
);

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
//reader.
module.exports = blacklist;

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/