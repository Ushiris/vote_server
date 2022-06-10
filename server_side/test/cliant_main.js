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

function isNull(value, subValue){
    return value == "" ? subValue : value;
}

function create(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "Create");

    try {
        var data = {
            "key"       : isNull(document.getElementById('create-key').value,       "-1"),
            "createday" : isNull(document.getElementById('create-createday').value, "2022/09/06"),
            "order"     : isNull(document.getElementById('create-order').value,     "2022090699"),
            "question"  : isNull(document.getElementById('create-question').value,  "how old are you?"),
            "closeday"  : isNull(document.getElementById('create-closeday').value,  "2022/10/10"),
            "name"      : isNull(document.getElementById('create-name').value,      "ushiris"),
            "pass"      : isNull(document.getElementById('create-pass').value,      "debug")
        }
    
        XHR.setRequestHeader('Question', JSON.stringify(data));
    } finally {
        XHR.send(JSON.stringify(data));
    }

    console.log("create!");
}

function deleteQ(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "Delete");

    try {
        var data = {
            "key"       : isNull(document.getElementById('delete-key').value       , "-1"),
            "createday" : isNull(document.getElementById('delete-createday').value , "2022/09/06"),
            "order"     : isNull(document.getElementById('delete-order').value     , "2022090699"),
            "question"  : isNull(document.getElementById('delete-question').value  , "how old are you?"),
            "closeday"  : isNull(document.getElementById('delete-closeday').value  , "2022/10/10"),
            "name"      : isNull(document.getElementById('delete-name').value      , "ushiris"),
            "pass"      : isNull(document.getElementById('delete-pass').value      , "debug")
        }
    
        XHR.setRequestHeader('Question', JSON.stringify(data));
    } finally {
        XHR.send(JSON.stringify(data));
    }

    console.log("delete!");
}

function answer(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "Answer");

    try {
        var data = {
            "key"       : isNull(document.getElementById('answer-key').value       , "-1"),
            "createday" : isNull(document.getElementById('answer-createday').value , "2022/09/06"),
            "order"     : isNull(document.getElementById('answer-order').value     , "2022090699"),
            "answer1"   : isNull(document.getElementById('answer-answer1').value   , "10"),
            "answer2"   : isNull(document.getElementById('answer-answer2').value   , "text"),
            "id"        : isNull(document.getElementById('answer-id').value        , "KCF-1234111.111.121")
        }
    
        XHR.setRequestHeader('Answer', JSON.stringify(data));
    } finally {
        XHR.send(JSON.stringify(data));
    }

    console.log("answer!");
}

function init(){
    var XHR = generateXHR();
    XHR.setRequestHeader('Action', "init");

    try {
        var dummy = {
            "key"       : isNull(document.getElementById('answer-key').value       , "-1"),
            "createday" : isNull(document.getElementById('answer-createday').value , "2022/09/06"),
            "order"     : isNull(document.getElementById('answer-order').value     , "2022090699"),
            "answer1"   : isNull(document.getElementById('answer-answer1').value   , "10"),
            "answer2"   : isNull(document.getElementById('answer-answer2').value   , "text"),
            "id"        : isNull(document.getElementById('answer-id').value        , "KCF-1234111.111.121")
        }
        
        XHR.setRequestHeader('Answer', JSON.stringify(dummy));
    } finally {
        XHR.send(JSON.stringify(dummy));
    }

    console.log("init!");
}