exports.action = function(param){
    const settings = require("../../settings");
    const fs = require("fs");
    const counter = JSON.parse(fs.readFileSync("../data/count.json"));
    counter.count++;
    
    var voteFile = settings.getVoteJson();

    var question = {
        "createday" : new Date().toLocaleDateString(),
        "order" : createDay.replace("/", "") + counter.count,
        "question" : param["question"],
        "closeday" : param["closeday"],
        "name" : param["name"],
        "pass" : param["pass"]
    }

    voteFile.QuestionInfo.push(question);
    settings.setVoteJson(voteFile);
}