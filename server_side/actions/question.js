exports.action = function(param){
    const settings = require("../settings");
    var voteFile = JSON.parse(settings.getVoteJson());

    var question = {
        "key"       : settings.generateKey(),
        "question" : param["question"],
        "closeday" : param["closeday"],
        "name" : param["name"],
        "pass" : param["pass"]
    }

    var dt = new Date();
    var y = new String(dt.getFullYear());
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    question["createday"] = y + "/" + m + "/" + d;

    var order = settings.generateOrder(question.createday.replace(/\//g, ""));
    question["order"] = order;

    voteFile.QuestionInfo.push(question);
    settings.setVoteJson(voteFile);

    return JSON.stringify(question);
}