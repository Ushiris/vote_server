const fs = require('fs');
const DEBUG_FLAG = true;

exports.params = {
    "isDebug"  : DEBUG_FLAG,
    "voteFile" : DEBUG_FLAG ? "./test/test_result.json" : "./activeVote.json",
    "archive"  : DEBUG_FLAG ? "./test/testLog.json" : "./archives/Log.json",
    "port"     : 3000,
    "MIME"     : {
        ".html" : "text/html",
        ".css"  : "text/css",
        ".js"   : "text/javascript"
        // 読み取りたいMIMEタイプはここに追記
    },
    "actions"  : {
        "Answer"     : require('./actions/vote').action,
        "Create"     : require('./actions/question').action,
        "Delete"     : require('./actions/delete.js').action,
        //ここで機能の登録を行う
        "Get"        : require('./actions/get.js').action
    }
}

exports.getVoteJson = function(){
    return require(exports.params.voteFile);
}

exports.setVoteJson = function(jsonObj){
    fs.writeFileSync(exports.params.voteFile, JSON.stringify(jsonObj));
}