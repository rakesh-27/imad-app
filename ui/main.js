console.log('Loaded!');
var mar = 0;
function moveRight(){
    mar = mar+0.5;
    img.style.marginLeft = mar + 'px';
}
var img = document.getElementById('madi');
img.onclick = function(){
    var interval = setInterval(moveRight, 10);
}