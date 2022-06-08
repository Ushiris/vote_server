exports.action = function(param){
    //データのロード
    const settings = require("../settings");
    settings.deleteAllData();

    return JSON.stringify({"result" : "init!"});
}