const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;


canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;
let map = document.getElementById("onipng");


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }

    if (e.target.id === 'oni') {
      map = document.getElementById("onipng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'ahten') {
      map = document.getElementById("ahtenpng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'aimi') {
      map = document.getElementById("aimipng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'atlas') {
      map = document.getElementById("atlaspng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
    if (e.target.id === 'night') {
      map = document.getElementById("nightpng");
      ctx.drawImage(map,0,0,canvas.width, canvas.width*9/16);
    }
});

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
