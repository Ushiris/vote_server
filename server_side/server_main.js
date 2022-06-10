//必要なモジュールのインポート
var fs = require('fs');
var path = require('path');
var os = require('os');
const settings = require('./settings.js');

//サーバー作成
var http = require('http');
var server = http.createServer().on('request', main).listen(settings.params.port);

//ローカルURLをサーバーのコンソールに表示する
const ip = Object.values(os.networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
console.log(`URL:http://${ip}:${settings.params.port}`);

/**
 * @description リクエストへの応答を行います。
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function main(req, res) {
    var mode = req.headers["votesystem"] ?? "std";

    //ヘッダーの定義
    req.setEncoding("utf-8");

    //データの読み込み中の処理
    var raw_data = "";
    req.on("data", chunk => {
        if (chunk.trim() != "") raw_data += chunk;

        //データの読み込み完了時の処理
    }).on("end", () => {
        var result = "none";

        //処理を呼び出しに行く
        if (req.headers["action"]) {
            console.log(req.headers["answer"] ?? req.headers["question"] ?? raw_data);
            result = settings.params.actions[req.headers["action"]](
                JSON.parse(
                    req.headers["answer"] ?? req.headers["question"] ?? raw_data
                )
            );
        }

        //ページ名の解釈
        var filePath = req.url == '/' ? '\\test\\index.html' : req.url;
        var fullPath = __dirname + filePath.replace("/", "\\");

        res.writeHead(200,
            {
                'Content-Type'                 : settings.getMIME(mode, fullPath),
                'Access-Control-Allow-Origin'  : "*", /* CROS規約の回避 */
                "Access-Control-Allow-Headers" : "*"  /* CROS規約の回避 */
            }
        );

        res.write(mode == "api" ? result : getDebugPage(result, fullPath));
        res.end();
    });
}

function getDebugPage(result, fullPath) {
    var data = fs.readFileSync(fullPath, 'utf-8');
    data = data.replace(/\<serverIP\>/g, ip)
        .replace(/\<port\>/g, settings.params.port)
        ;

    return data;
}