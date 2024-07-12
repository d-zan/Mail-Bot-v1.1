
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { GoodDB, JSONDriver } = require("good.db");
/**
 @param if you developer That's will help you to use database. 
 */
const box = new GoodDB(
  new JSONDriver({ path: "database/DATA/box.json", format:true })
);

//reader.
module.exports = box;

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/