exports.action = function(param){
    const settings = require("../settings");
    
    var voteFile = JSON.parse(settings.getVoteJson());
    var answer = {
        "key"       : param["key"],
        "order"     : param["order"],
        "answer1"   : param["answer1"],
        "answer2"   : param["answer2"],
        "id"        : param["id"]
    }

    var dt = new Date();
    var y = new String(dt.getFullYear());
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    answer["createday"] = y + "/" + m + "/" + d;

    voteFile.AnswerInfo.push(answer);
    settings.setVoteJson(voteFile);

    return JSON.stringify(answer);
}