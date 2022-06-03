exports.action = function(param){
    const settings = require("../../settings");

    var voteFile = JSON.parse(settings.getVoteJson());

    var question = {
        "key"       : param["key"],
        "createday" : new Date().toLocaleDateString(),
        "order" : createDay.replace("/", "") + counter.count,
        "question" : param["question"],
        "closeday" : param["closeday"],
        "name" : param["name"],
        "pass" : param["pass"]
    }

    voteFile.QuestionInfo.push(question);
    settings.setVoteJson(voteFile);

    return JSON.stringify(question);
}