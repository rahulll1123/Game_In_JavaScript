//** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
// console.log(ctx);

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const enemy1 = new Image();
enemy1.src = "ravenSmall.png";

let gameFrame = 1;
let gameSpeed = 10;


let numberofEnemy = 10;


class Enemy {
    constructor() {
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = Math.random() * CANVAS_HEIGHT;
        this.initialX=this.x;
        this.initialY=this.y;
        // this.width = 271;
        // this.height = 194;
        this.width=135.5;
        this.height=97.
        this.speed = Math.random() * gameSpeed + 2;
        this.FrameCount = 6;
        this.currframe = 0;
        this.mov = 1;
        this.curve = Math.floor(Math.random() * 4 + gameSpeed / 10);
        this.pattern = Math.floor(Math.random() * 3);
    }
    update() {
        this.x += Math.random() * this.speed * this.mov - this.speed / 2 * this.mov;
        this.y += Math.random() * this.speed * this.mov - this.speed / 2 * this.mov;
        this.currframe = Math.floor(gameFrame / this.FrameCount) % this.FrameCount;
    }
    update2() {
        this.x += Math.random() * this.speed * this.mov - this.speed * this.mov;
        if (this.x < -this.width)
            this.x = CANVAS_WIDTH;

        this.y =  this.initialY + Math.sin(gameFrame / 20) * CANVAS_HEIGHT / 10 * this.curve;

        this.currframe = Math.floor(gameFrame / this.FrameCount) % this.FrameCount;
    }
    update3() {
        this.x += Math.random() * this.speed * this.mov - this.speed * this.mov - Math.cos(gameFrame / 20) * 10;

        if (this.x < -this.width)
            this.x = CANVAS_WIDTH;

        this.y = CANVAS_HEIGHT / 2 + Math.sin(gameFrame / 20) * CANVAS_HEIGHT / 10 * this.curve;

        this.currframe = Math.floor(gameFrame / this.FrameCount) % this.FrameCount;
    }
    draw() {
        ctx.drawImage(enemy1, this.currframe * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
const enemysArray = [];
for (let i = 0; i < numberofEnemy; i++) {
    enemysArray.push(new Enemy());
}

enemy1.onload = () => {
    startGame();
}

function startGame() {

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        enemysArray.forEach(enemy => {

            if (enemy.pattern == 0) {
                enemy.update();
            } else if (enemy.pattern == 1) {
                enemy.update2();
            } else {
                enemy.update3();
            }
            enemy.draw();
        })
        // console.log("Start");
        gameFrame++;

        requestAnimationFrame(animate);
    }
    animate();
}

