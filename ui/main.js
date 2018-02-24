console.log('Loaded!');
var mar = 0;
function moveRight(){
    mar = mar+1;
    img.style.marginLeft = mar + 'px';
}
var img = documentgetElementById('madi');
img.onclick = function(){
    var interval = setInterval(moveRight, 50);
}