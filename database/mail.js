
/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
const { GoodDB, JSONDriver } = require("good.db");
/**
 ** That's will help me to use database.
@param
 */
const mail = new GoodDB(
  new JSONDriver({ path: "database/DATA/mail.json", format:true })
);

//reader.
module.exports = mail; 

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/