let state = "idle";
const dropdown=document.getElementById("animations");
dropdown.addEventListener('change',function(e){
    state=e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);


const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spritewidth = 575;
const spriteheight = 523;
let gameFrame = 0;
let staggerFrame = 5;

const spriteAnimation = [];
const animationStates = [
    {
        name: "idle",
        frames: 7
    },
    {
        name: "jump",
        frames: 7
    },
    {
        name: "fall",
        frames: 7
    },
    {
        name: "run",
        frames: 9
    },
    {
        name: "dizzy",
        frames: 11
    },
    {
        name: "sit",
        frames: 5
    },
    {
        name: "roll",
        frames: 7
    },
    {
        name: "bite",
        frames: 7
    },
    {
        name: "ko",
        frames: 12
    },
    {
        name: "getHit",
        frames: 4
    },
    
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: []
    }
    for (j = 0; j < state.frames; j++) {
        let frameX = j * spritewidth;
        let frameY = index * spriteheight;
        frames.loc.push({ x: frameX, y: frameY });
    }
    spriteAnimation[state.name] = frames;
})
console.log(spriteAnimation);



animate();
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.drawImage(Image,sx,sy,sw,sh,dx,dy,dw,dh);
    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimation[state].loc.length;
    let frameX = spriteAnimation[state].loc[position].x;
    let frameY=spriteAnimation[state].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spritewidth, spriteheight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameFrame++;

    requestAnimationFrame(animate);
}