console.log('Loaded!');
var mar = 0;
function moveRight(){
    mar = mar+0.3;
    img.style.marginLeft = mar + 'px';
}
var img = document.getElementById('madi');
img.onclick = function(){
    var interval = setInterval(moveRight, 10);
};
var button = document.getElementById('counter');
var sp = document.getElementById("cnt");
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                sp.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET', 'http://rockeshkumawath26.imad.hasura-app.io/counter', true);
    request.send(null);
};


var ul = document.getElementById('namesList');
var submit = document.getElementById('btn');
submit.onclick = function() {
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names = request.responseText;
                names=JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length; i++){
                    list += "<li>" + names[i] + "</li>";
                }
                ul.innerHTML = list;
            }
        }
    };
    var nameInput = document.getElementById("name");
    var name = nameInput.value;
    request.open('GET', 'http://rockeshkumawath26.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
    
    
}