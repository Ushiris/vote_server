exports.action = function(param){
    const settings = require("../../settings");
    
    var voteFile = JSON.parse(settings.getVoteJson());
    var deleted_data = {};

    for(var i = 0;i < voteFile.QuestionInfo.length;i++){
        if(voteFile.QuestionInfo[i].key == param["key"]){
            deleted_data = voteFile.QuestionInfo[i];
            voteFile.QuestionInfo.splice(i, 1);
            break;
        }
    }

    settings.setVoteJson(voteFile);

    return JSON.stringify(deleted_data);
}