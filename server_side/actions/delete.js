exports.action = function(param){
    const settings = require("../settings");
    
    var voteFile = JSON.parse(settings.getVoteJson());
    var deleted_data = "";

    for(var i = 0;i < voteFile.QuestionInfo.length;i++){
        if(voteFile.QuestionInfo[i].key == param["key"]){
            if(voteFile.QuestionInfo[i].pass != param["pass"]){
                return '{"ERROR" : "パスワードが異なります"}';
            }
            deleted_data = JSON.stringify(voteFile.QuestionInfo[i]);
            voteFile.QuestionInfo.splice(i, 1);
            
            break;
        }
    }

    settings.setVoteJson(voteFile);

    return deleted_data;
}