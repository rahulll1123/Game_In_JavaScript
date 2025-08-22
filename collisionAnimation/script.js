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


const image = new Image();
image.src = "boom.png";

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
        this.audio.play();
    }
    update() {
        this.frame += .2;
        this.currframe = Math.floor(this.frame);

    }
    draw() {
        ctx.drawImage(image, this.currframe * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

let boomArray = [];
window.addEventListener("click", (e) => {
    boomArray.push(new Boom(e.x, e.y));
    // console.log(e,clickX,clickY);
})

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // obj.update();
    // obj.draw();
    for (let i = 0; i < boomArray.length; i++) {
        if (boomArray[i].frame == 0) {

        }
        if (boomArray[i].frame > boomArray[i].frames) {
            boomArray.splice(i, 1);
        } else {
            boomArray[i].update();
            boomArray[i].draw();
        }
    }

    requestAnimationFrame(animate);
}

animate(0);

