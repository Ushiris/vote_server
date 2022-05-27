exports.action = function(param){
    const settings = require("../../settings");
    
    var voteFile = JSON.parse(settings.getVoteJson());

    return JSON.stringify(voteFile);
}