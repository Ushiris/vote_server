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
server.on('request', Main).listen(settings.params.port);

function Main(req, res){
    req.setEncoding("utf-8");

    res.writeHead(200, 
        {
            'Content-Type' : "text/plain",
            "voteSyatem" : "hoge!",
            'Access-Control-Allow-Origin' : "*", /* CROS規約の回避 */
            "Access-Control-Allow-Headers" : "*" /* CROS規約の回避 */
        }
    );

    //データの読み込み中の処理
    var raw_data = "";
    req.on("data", chunk => {
        if(chunk.trim() != "")raw_data += chunk;

    //データの読み込み完了時の処理
    }).on("end", () => {
        var result = "none";

        //処理を呼び出しに行く
        if(req.headers["Action Header"] != undefined){
            //AnswerかQuestionを持たせる
            var ans = req.headers["Answer"] ?? null;
            var que = req.headers["Question"] ?? {};

            result = settings.params.actions["Action Header"](ans ?? que);
        }

        res.write(result);
        res.end();
    });
}

//定期的に締め切りが過ぎた質問がないかチェックしたい
setTimeout(()=>{}, 300000);

//URLをサーバーのコンソールに表示する
const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
console.log(`URL:http://${ip}:${settings.params.port}`);