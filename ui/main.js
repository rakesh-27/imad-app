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
var span = document.getElementById('count');
button.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readystate === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                span.textcontent = counter.toString();
            }
        }
    };
    request.open('GET', 'http://rockeshkumawath26.imad.hasura-app.io/counter', true);
    request.send(null);
};
