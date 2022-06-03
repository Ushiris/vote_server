const fs = require('fs');

/**
 * @var Object
 */
exports.params = {
    "voteFile" : "./data/voteData.json",
    "logFile"  : "./data/logs.json",
    "port"     : 3000,
    "MIME"     : {
        ".html" : "text/html",
        ".css"  : "text/css",
        ".js"   : "text/javascript"
        // 読み取りたいMIMEタイプはここに追記
    },
    "actions"  : {
        "Answer"     : require('./actions/vote.js').action,
        "Create"     : require('./actions/question.js').action,
        "Delete"     : require('./actions/delete.js').action,
        //ここで機能の登録を行う
        "Get"        : require('./actions/get.js').action
    }
}

/**
 * @description 投票データをStringで取得します。
 * @returns String
 */
exports.getVoteJson = function(){
    return require(exports.params.voteFile);
}

/**
 * @description 投票データを上書きします。
 * @param Object jsonObj
 * @returns String
 */
exports.setVoteJson = function(jsonObj){
    fs.writeFileSync(exports.params.voteFile, JSON.stringify(jsonObj));
}