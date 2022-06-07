//必要なモジュールのインポート
var fs = require('fs');
var path = require('path');
var os = require('os');

const settings = require('./settings');

//サーバー作成
var http = require('http');
var server = http.createServer();

//サーバーへ何かが届いた時の処理
server.on('request', main).listen(settings.params.port);

/**
 * @description リクエストへの応答を行います。
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function main(req, res){
    var mode = req.headers["voteSystem"] ?? "";

    //ヘッダーの定義
    req.setEncoding("utf-8");

    //データの読み込み中の処理
    var raw_data = "";
    req.on("data", chunk => {
        if(chunk.trim() != "")raw_data += chunk;

    //データの読み込み完了時の処理
    }).on("end", () => {
        var result = "none";

        console.log(req.headers);

        //処理を呼び出しに行く
        if(req.headers["action"]){
            //AnswerかQuestionを持たせる
            var ans = req.headers["answer"] ?? null;
            var que = req.headers["question"] ?? {};

            result = settings.params.actions[req.headers["action"]](ans ?? que);
        }

        //ページ名の解釈
        var filePath = "";
        if (req.url == '/') {
            filePath = '\\test\\index.html';
        } else {
            filePath = req.url;
        }
        var fullPath = __dirname + filePath.replace("/","\\");

        res.writeHead(200, 
            {
                'Content-Type' : mode == "" ? (settings.params.MIME[path.extname(fullPath)] ?? "text/plain") : "text/plain",
                'Access-Control-Allow-Origin' : "*", /* CROS規約の回避 */
                "Access-Control-Allow-Headers" : "*" /* CROS規約の回避 */
            }
        );

        console.log(result);

        res.write(mode == "" ? getDebugPage(result, fullPath) : result);
        res.end();
    });
}

function getDebugPage(result, page){
    return fs.readFileSync(page, 'utf-8').replace("<!-- -voteSystem.output- -->", result);
}

//定期的に締め切りが過ぎた質問がないかチェックしたい
setTimeout(()=>{}, 300000);

//URLをサーバーのコンソールに表示する
const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
console.log(`URL:http://${ip}:${settings.params.port}`);