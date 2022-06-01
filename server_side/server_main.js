//必要なモジュールのインポート
var fs = require('fs');
var path = require('path');
var os = require('os');
  
//ファイルのパスなど、環境に関わる設定
const settings = require('./settings');

//サーバー作成
var http = require('http');
var server = http.createServer();

//サーバーへ何かが届いた時の処理
server.on('request', settings.params.isDebug ? debugResponce : releseResponce).listen(settings.params.port);

function debugResponce(req, res){
    req.setEncoding("utf-8");
    var raw_data = "";

    res.writeHead(200, 
        {
            'Content-Type' : "text/plain",
            "voteSyatem" : "hoge!",
            'Access-Control-Allow-Origin' : "*",
            "Access-Control-Allow-Headers" : "*"
        }
    );

    //データの読み込み中の処理
    req.on("data", chunk => {
        if(chunk.trim() != "")raw_data += chunk;

    //データの読み込み完了時の処理
    }).on("end", () => {
        var result = "none";

        console.log(req.headers);

        //処理を呼び出しに行く
        if(req.headers["Action Header"] != undefined){
            //AnswerかQuestionを持たせる
            var ans = req.headers["Answer"] ?? null;
            var que = req.headers["Question"] ?? {};

            result = settings.params.actions["Action Header"](ans ?? que);
        }

        //ページ名の解釈
        var filePath = req.url == '/' ? settings.params.home : req.url;
        var fullPath = __dirname + filePath.replace("/","\\");

        console.log(raw_data);

        res.write(result);
        res.end();
    });
}

function releseResponce(req, res){
    req.setEncoding("utf-8");
    var raw_data = "";

    //データの読み込み中の処理
    req.on("data", chunk => {
        if(chunk.trim() != "")raw_data += chunk;

    //データの読み込み完了時の処理
    }).on("end", () => {
        //パラメータの整形
        var params_str = raw_data.split("&");
        var param = new Object();
        params_str.forEach(item => {
            var pair = item.split("=");
            param[pair[0]] = pair[1] == "undefined" ? "" : pair[1];
        });
    });
}

//定期的に締め切りが過ぎた質問がないかチェックしたい
setTimeout(()=>{}, 300000);

//URLをサーバーのコンソールに表示する
const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
console.log(`URL:http://${ip}:${settings.params.port}`);