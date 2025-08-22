const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
let clickX = 0;
let clickY = 0;
const loadaudio = new Audio();
loadaudio.src = "burst.mp3";

const image = new Image();
image.src = "boom.png";

const enemyimage = new Image();
enemyimage.src = "raven.png";

let EnemyPerWave = 3;

class Boom {
    constructor(posX, posY) {
        this.height = 179;
        this.width = 200;
        this.x = posX - this.width / 2;
        this.y = posY - this.height / 2;
        this.currframe = 0;
        this.frames = 5;
        this.frame = 0;
        this.audio = new Audio();
        this.audio.src = "burst.mp3";
    }
    update() {
        this.frame += .2;
        this.currframe = Math.floor(this.frame);
    }
    draw() {
        ctx.drawImage(image, this.currframe * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor() {
        this.width = 271;
        this.height = 194;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height)
        this.initialY = this.y;
        this.currframe = 0;
        this.frames = 6;
        this.frame = 0;
        this.swingAmplitude = Math.random() * 50 + 10;
        this.speed = Math.random() * 10 + 3;
    }
    update() {
        this.x -= this.speed;
        this.y = this.initialY + Math.sin(this.frame) * this.swingAmplitude;
        this.frame += .2;
        this.currframe = Math.floor(this.frame % this.frames);
    }
    draw() {
        ctx.drawImage(enemyimage, this.currframe * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

let enemyArray = [];
setInterval(() => {
    let enemydrop = Math.random() * EnemyPerWave;
    for (let i = 0; i < enemydrop; i++) {
        enemyArray.push(new Enemy());
    }
}, 1000);

let boomArray = [];
window.addEventListener("click", (e) => {
    boomArray.push(new Boom(e.x, e.y));
    // console.log(e,clickX,clickY);
})
let oldtimestamp=0;

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < enemyArray.length; i++) {
        enemyArray[i].update();
        enemyArray[i].draw();
    }


    for (let i = 0; i < boomArray.length; i++) {
        if (boomArray[i].frame == 0) {

            boomArray[i].audio.play();
        }
        if (boomArray[i].frame > boomArray[i].frames) {
            boomArray.splice(i, 1);
        } else {
            boomArray[i].update();
            boomArray[i].draw();
        }
    }
    let deltatime=timestamp-oldtimestamp;
    oldtimestamp=timestamp;
    console.log(deltatime);
    requestAnimationFrame(animate);
}
animate(0);

