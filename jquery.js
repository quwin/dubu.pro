$(function() {
  $( ".draggable" ).draggable();
});

const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
const characters = ['aimi', 'asher', 'atlas', 'drekar', 'dubu', 'era', 'estelle', 'finii', 'juliette', 'juno', 'kai', 'luna', 'octavia', 'rasmus', 'rune', 'vyce', 'x', 'zentaro'];


canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 4;
let startX;
let startY;
let map = document.getElementById("onipng");
let barriers = true;
let ally = true;


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'barriers') {
      barriers = !barriers;
    }
    if (e.target.id === 'ally') {
      ally = !ally;
    }

    if (e.target.id === 'oni') {
      map = document.getElementById("onipng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'ahten') {
      map = document.getElementById("ahtenpng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
      if (!barriers) {
        ctx.drawImage(document.getElementById("ahtenleft"),0,0,canvas.width/5, canvas.width*9/16);
        ctx.drawImage(document.getElementById("ahtenright"),canvas.width*4/5,0,canvas.width/5, canvas.width*9/16);
      }
    }
    if (e.target.id === 'aimiapp') {
      map = document.getElementById("aimipng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'atlaslab') {
      map = document.getElementById("atlaspng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'night') {
      map = document.getElementById("nightpng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'demon') {
      map = document.getElementById("demonpng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
});

toolbar.addEventListener('mousedown', e => {
  if (characters.includes(e.target.id)) {
    newSticker('images/' + e.target.id + '.png');
  }
  $( ".draggable" ).draggable();
});

function newSticker(src) {
  let img = new Image(canvas.width/30, canvas.width/30);
    img.src = src;
    img.classList.add('draggable');
    img.draggable = false;
    img.style.position = 'absolute';
    if (!ally) {
      img.style.border = '2px solid #cb4465'
    }
    document.getElementById('center').appendChild(img);

    // Start dragging immediately
    let offsetX = img.getBoundingClientRect().left + 45;
    let offsetY = img.getBoundingClientRect().top + 45;
    
    function moveSticker(event) {
      img.style.left = (event.clientX - offsetX) + 'px';
      img.style.top = (event.clientY - offsetY) + 'px';
    }

    function stopDragging() {
      window.removeEventListener('mousemove', moveSticker);
      window.removeEventListener('mouseup', stopDragging);
    }

    window.addEventListener('mousemove', moveSticker);
    window.addEventListener('mouseup', stopDragging);
}

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);