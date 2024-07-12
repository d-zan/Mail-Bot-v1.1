const {
  clientId,
  serverID,
  owner,
  prefix,
  timestamp,
  status,
} = require("../JSON/config.json");

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/
module.exports = {
  /** 
 Bot config
 @description
*/
  bot: {
    Id: clientId,
    guildId: serverID,
    owners: owner,
    prefix: prefix,
    status: status,
    timestamp: timestamp,
  },
};

/**
* Developer : dz0. 
لا يسمح ب نقل او نسخ اي من الاكواد الاتيه.
* https://dsc.gg/dzan-portfolio

*/