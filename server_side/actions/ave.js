exports.action = function(param){
    //データのロード
    const settings = require("../settings");
    var voteFile = JSON.parse(settings.getVoteJson());

    //処理
    var sum = 0;
    var count = 0;
    voteFile.AnswerInfo.forEach(item => {
        if(item.key == param.key){
            sum += item.answer1;
            count++;
        }
    });

    return JSON.stringify({"key" : param.key, "answer1" : sum / count});
}