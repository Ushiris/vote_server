var XHR = new XMLHttpRequest();

XHR.addEventListener('load', event => {
    console.log("loaded");
});

XHR.addEventListener('error', event =>{
    console.log("error!");
    console.log(event);
});

function beginConnection(){
    XHR.open('GET', "http://192.168.10.151:3000");
    XHR.setRequestHeader('voteSystem', '');
}

function create(){
    beginConnection();
    XHR.setRequestHeader('Action', "Create");

    var data = {
        "key"       : document.getElementById('create-key').ariaValueNow,
        "createday" : document.getElementById('create-createday').ariaValueNow,
        "order"     : document.getElementById('create-order').ariaValueNow,
        "question"  : document.getElementById('create-question').ariaValueNow,
        "closeday"  : document.getElementById('create-closeday').ariaValueNow,
        "name"      : document.getElementById('create-name').ariaValueNow,
        "pass"      : document.getElementById('create-pass').ariaValueNow
    }

    XHR.setRequestHeader('Question', JSON.stringify(data));
    XHR.send("");

    console.log("create!");
}

function deleteQ(){
    beginConnection();
    XHR.setRequestHeader('Action Header', "Delete");

    var data = {
        "key"       : document.getElementById('delete-key').value,
        "createday" : document.getElementById('delete-createday').value,
        "order"     : document.getElementById('delete-order').value,
        "question"  : document.getElementById('delete-question').value,
        "closeday"  : document.getElementById('delete-closeday').value,
        "name"      : document.getElementById('delete-name').value,
        "pass"      : document.getElementById('delete-pass').value
    }

    XHR.setRequestHeader('Question', JSON.stringify(data));
    XHR.send("");

    console.log("delete!");
}

function answer(){
    beginConnection();
    XHR.setRequestHeader('Action Header', "Answer");

    var data = {
        "key"       : document.getElementById('answer-key').value,
        "createday" : document.getElementById('answer-createday').value,
        "order"     : document.getElementById('answer-order').value,
        "answer1"   : document.getElementById('answer-answer1').value,
        "answer2"   : document.getElementById('answer-answer2').value,
        "id"        : document.getElementById('answer-id').value
    }

    XHR.setRequestHeader('Answer', JSON.stringify(data));
    XHR.send("");

    console.log("answer!");
}