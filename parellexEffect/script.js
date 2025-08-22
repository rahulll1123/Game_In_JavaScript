const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10;

const images = [
    { img: new Image(), src: "layer-1.png" },
    { img: new Image(), src: "layer-2.png" },
    { img: new Image(), src: "layer-3.png" },
    { img: new Image(), src: "layer-4.png" },
    { img: new Image(), src: "layer-5.png" }
];

let loadedImages = 0;

images.forEach((layer, idx) => {
    layer.img.src = layer.src;
    layer.img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            startGame();
        }
    };
});

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x =0;
        }
        this.x-=Math.floor(this.speed); 

    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}
function startGame() {
    const Layer1 = new Layer(images[0].img, 0.2);
    const Layer2 = new Layer(images[1].img, 0.3);
    const Layer3 = new Layer(images[2].img, 0.4);
    const Layer4 = new Layer(images[3].img, 0.6);
    const Layer5 = new Layer(images[4].img, 1);

    const background = [Layer1, Layer2, Layer3, Layer4, Layer5];

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background.forEach(element => {
            element.update();
            element.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}