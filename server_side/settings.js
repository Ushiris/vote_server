const fs = require('fs');
const path = require('path');

/**
 * @var Object
 */
exports.params = {
    "voteFile" : "/data/voteData.json",
    "logFile"  : "/data/logs.json",
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
        "get"        : (param) => {return exports.getVoteJson()},
        "init"       : require('./actions/init.js').action
    }
}

exports.getMIME = function(mode, fullPath){
    if(mode == 'api') return "text/plain";

    switch(path.extname(fullPath)){
        case ".html" : return "text/html";
        case ".css"  : return "text/css";
        case ".js"   : return "text/javascript";
        default      : return "text/plain";
    }
}

/**
 * @description 数値NUMをLEN桁でゼロ埋めします。桁があふれると上の桁が失われるので注意。
 * @param {int} NUM 
 * @param {int} LEN 
 * @returns String
 */
exports.zeroPadding = function (NUM, LEN){
	return ( Array(LEN).join('0') + NUM ).slice( -LEN );
}

/**
 * @description 投票データをStringで取得します。
 * @returns String
 */
exports.getVoteJson = function(){
    return fs.readFileSync(__dirname + exports.params.voteFile.replace("/","\\"));
}

/**
 * @description 投票データを上書きします。
 * @param {Object} jsonObj
 */
exports.setVoteJson = function(jsonObj){
    fs.writeFileSync(__dirname + exports.params.voteFile.replace("/","\\"), JSON.stringify(jsonObj));
}

/**
 * @description question用の値（order）を生成します。これは一意でなくとも良い値です。
 * @param {String} prefix 
 * @returns String fullOrder
 */
exports.generateOrder = function(prefix){
    var count = JSON.parse(fs.readFileSync(__dirname + "\\data\\counter.json"));

    if(!count[prefix]){
        count[prefix] = 0;
    }
    count[prefix]++;

    fs.writeFileSync(__dirname + "\\data\\counter.json", JSON.stringify(count));

    return prefix + exports.zeroPadding(count[prefix], 2);
}

/**
 * @description question用の一意な値（key）を生成します
 * @returns int
 */
exports.generateKey = function(){
    var count = JSON.parse(fs.readFileSync(__dirname + "\\data\\counter.json"));
    count.key++;

    fs.writeFileSync(__dirname + "\\data\\counter.json", JSON.stringify(count));

    return count.key;
}

/**
 * @description 全てのデータを消去します。初期化する際以外には使わない方がよい。
 */
exports.deleteAllData = function(){
    var defaultVote = '{"QuestionInfo":[],"AnswerInfo":[]}';
    var defaultCount = '{}';

    fs.writeFileSync(__dirname + exports.params.voteFile.replace("/","\\"), defaultVote);
    fs.writeFileSync(__dirname + "\\data\\counter.json", defaultCount);
}