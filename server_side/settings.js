const fs = require('fs');
const DEBUG_FLAG = true;

exports.params = {
    "isDebug"  : DEBUG_FLAG,
    "voteFile" : DEBUG_FLAG ? "./test/test_result.json" : "./activeVote.json",
    "archive"  : DEBUG_FLAG ? "./test/testLog.json" : "./archives/Log.json",
    "port"     : 3000,
    "home"     : DEBUG_FLAG ? "\\test/index.html" : "\\index.html",
    "counter"  : "./data/count.json",
    "MIME"     : {
        ".html" : "text/html",
        ".css"  : "text/css",
        ".js"   : "text/javascript",
        ".ico"  : "image/vnd.microsoft.icon"
        // 読み取りたいMIMEタイプはここに追記
    },
    "actions"  : {
        "vote"       : require('./actions/vote').action,
        "checkClose" : require('./actions/checkClose').action,
        "create"     : require('./actions/question').action,
        "delete"     : require('./actions/delete.js').action,
        //ここで機能の登録を行う
        "load"       : (()=>{})
    }
}

exports.getVoteJson = function(){
    return require(exports.params.voteFile);
}

exports.setVoteJson = function(jsonObj){
    fs.writeFileSync(exports.params.voteFile, JSON.stringify(jsonObj));
}