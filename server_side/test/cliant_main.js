function generateXHR(){
    var XHR = new XMLHttpRequest();

    XHR.addEventListener('readystatechange', event => {
        if( XHR.readyState == 4 && XHR.status == 200 )
        {
            if( XHR.response )
            {
                console.log(XHR.response);
                document.getElementById("output").innerText = JSON.stringify(JSON.parse(XHR.response), null, "\t");
            }
        }
    });
    XHR.open('POST', "<serverIP>:<port>");
    XHR.setRequestHeader('voteSystem', 'api');

    return XHR;
}

function create(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "Create");

    var data = {
        "key"       : document.getElementById('create-key').ariaValueNow       ?? "-1",
        "createday" : document.getElementById('create-createday').ariaValueNow ?? "2022/09/06",
        "order"     : document.getElementById('create-order').ariaValueNow     ?? "2022090699",
        "question"  : document.getElementById('create-question').ariaValueNow  ?? "how old are you?",
        "closeday"  : document.getElementById('create-closeday').ariaValueNow  ?? "2022/10/10",
        "name"      : document.getElementById('create-name').ariaValueNow      ?? "ushiris",
        "pass"      : document.getElementById('create-pass').ariaValueNow      ?? "debug"
    }

    XHR.setRequestHeader('Question', JSON.stringify(data));
    XHR.send("");

    console.log("create!");
}

function deleteQ(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "Delete");

    var data = {
        "key"       : document.getElementById('delete-key').value       ?? "-1",
        "createday" : document.getElementById('delete-createday').value ?? "2022/09/06",
        "order"     : document.getElementById('delete-order').value     ?? "2022090699",
        "question"  : document.getElementById('delete-question').value  ?? "how old are you?",
        "closeday"  : document.getElementById('delete-closeday').value  ?? "2022/10/10",
        "name"      : document.getElementById('delete-name').value      ?? "ushiris",
        "pass"      : document.getElementById('delete-pass').value      ?? "debug"
    }

    XHR.setRequestHeader('Question', JSON.stringify(data));
    XHR.send("");

    console.log("delete!");
}

function answer(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "Answer");

    var data = {
        "key"       : document.getElementById('answer-key').value       ?? "-1",
        "createday" : document.getElementById('answer-createday').value ?? "2022/09/06",
        "order"     : document.getElementById('answer-order').value     ?? "2022090699",
        "answer1"   : document.getElementById('answer-answer1').value   ?? "10",
        "answer2"   : document.getElementById('answer-answer2').value   ?? "text",
        "id"        : document.getElementById('answer-id').value        ?? "KCF-1234111.111.121"
    }

    XHR.setRequestHeader('Answer', JSON.stringify(data));
    XHR.send("");

    console.log("answer!");
}

function init(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "init");

    var dummy = {
        "key"       : document.getElementById('answer-key').value       ?? "-1",
        "createday" : document.getElementById('answer-createday').value ?? "2022/09/06",
        "order"     : document.getElementById('answer-order').value     ?? "2022090699",
        "answer1"   : document.getElementById('answer-answer1').value   ?? "10",
        "answer2"   : document.getElementById('answer-answer2').value   ?? "text",
        "id"        : document.getElementById('answer-id').value        ?? "KCF-1234111.111.121"
    }
    
    XHR.setRequestHeader('Answer', JSON.stringify(dummy));
    XHR.send("");

    console.log("init!");
}