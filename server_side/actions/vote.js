exports.action = function(param){
    const settings = require("../../settings");
    
    var voteFile = JSON.parse(settings.getVoteJson());
    var answer = {
        "key"       : param["key"],
        "createday" : param["createday"],
        "order"     : param["order"],
        "answer1"   : param["answer1"],
        "answer2"   : param["answer2"],
        "id"        : param["id"]
    }

    voteFile.AnswerInfo.push(answer);
    settings.setVoteJson(voteFile);
}