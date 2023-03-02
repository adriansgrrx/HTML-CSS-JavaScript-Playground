const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
const collisionCanvas = document.getElementById("collisionCanvas")
const collisionCtx = collisionCanvas.getContext("2d")
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;


const audio = new Audio('./Music/Retro Horror Sci-Fi Synth - Doomsday  Royalty Free No Copyright Background Music.mp3')
ctx.font = "50px Midfield" 
let score = 0;
let level = 1;
let gameOver = false;
let timeToNextMonster = 0;
let monsterInterval = 1000;
let lastTime = 0;
let monsters = [];

class Monster {
    constructor(){
        this.spriteWidth = 600;
        this.spriteHeight = 600;
        this.sizeModifier = Math.random() * 0.2 + 0.3;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height)
        this.directionX = Math.random() * 5 + 2.5;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = "./Images/blu-bat.png"
        this.frame = 0;
        this.maxFrame = 9;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 15 + 15;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = "rgb(" + this.randomColors[0] + "," + this.randomColors[1] + "," + this.randomColors[2] + ")";
    }
    update(deltaTime){
        if (score > 10) {
            this.directionX = (Math.random() * 7 + 5) + 4;
            monsterInterval = 595;
            gameSpeed = 5; 
            level = 2;
        }
        if (score > 20) {
            this.directionX = (Math.random() * 7 + 5) + 4;
            monsterInterval = 580;
            gameSpeed = 6; 
            level = 3;
        }

        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY *= -1
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if(this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
            particles.push(new Particle(this.x, this.y, this.width, this.color));
        }
        if(this.x < 0 - this.width) gameOver = true;
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

let gameSpeed = 5; 
class Layer {
    constructor(image, speedModifier, gameWidth, gameHeight){
        this.x = 0;
        this.y = 0;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 3000;
        this.height = 1667;
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * speedModifier
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.gameWidth){
            this.x = 0
        }
        this.x -= this.speed; 
    }
    draw() {
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.gameWidth, this.gameHeight)
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x + this.gameWidth, this.y, this.gameWidth, this.gameHeight)
    }
}

const backgroundLayer1 = new Image();
backgroundLayer1.src = './Layers/Layer 1.png';
const backgroundLayer2 = new Image();   
backgroundLayer2.src = './Layers/Layer 2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './Layers/Layer 3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './Layers/Layer 4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './Layers/Layer 5.png';

const layer1 = new Layer(backgroundLayer1, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer2 = new Layer(backgroundLayer2, 0.2, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer3 = new Layer(backgroundLayer3, 0.5, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer4 = new Layer(backgroundLayer4, 0.9, CANVAS_WIDTH, CANVAS_HEIGHT)
const layer5 = new Layer(backgroundLayer5, 0.9, CANVAS_WIDTH, CANVAS_HEIGHT)

const gameObjects = [layer1, layer2, layer3, layer4, layer5]

let explosions = [];
class Explosion {
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = "./Images/explosion.png";
        this.spriteWidth = 216;
        this.spriteHeight = 198;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = "./Music/Fire-impact.wav"
        this.timeSinceLastFrame = 0;
        this.frameInterval = 70
        this.markedForDeletion = false;
    }
    update(deltaTime){
        if(this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval){ 
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.markedForDeletion = true;
        };
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size/4, this.size, this.size);
    }
}

let particles = [];
class Particle {
    constructor(x, y, size, color){
        this.size = size;
        this.x = x + this.size/2;
        this.y = y + this.size/2;
        this.radius = Math.random() * this.size/10;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }
    update(){
        this.x += this.speedX;
        this.radius += 0.2;
        if (this.radius > this.maxRadius) this.markedForDeletion = true;
    }
    draw(){ 
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const playAgain = document.getElementById('play-again');
function drawGameOver(){
    ctx.textAlign = "center"
    ctx.fillStyle = "white"
    ctx.fillText("Game Over", canvas.width/2, canvas.height/2)
    playAgain.style.display = "block"
    audio.pause()
}

function drawScore(){
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 47, 70)
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 50, 73)
}

function drawLevel(){
    ctx.fillStyle = "black";
    ctx.fillText("Level: " + level, 47, 115)
    ctx.fillStyle = "white";
    ctx.fillText("Level: " + level, 50, 118)
}

window.addEventListener("click", function(e){
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1,1);
    console.log(detectPixelColor);
    const pc = detectPixelColor.data;
    monsters.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
            object.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.width))
        }
    })
});

function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextMonster += deltaTime;

    gameObjects.forEach(object => {
        object.update();
        object.draw();
    })

    if (timeToNextMonster > monsterInterval){
        monsters.push(new Monster());
        timeToNextMonster = 0;
        monsters.sort(function(a,b){
            return a.width - b.width;
        });
    };
    drawScore();
    drawLevel();
    [...particles, ...monsters, ...explosions].forEach(object => object.update(deltaTime));
    [...particles, ...monsters, ...explosions].forEach(object => object.draw());
    monsters = monsters.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
    particles = particles.filter(object => !object.markedForDeletion);
    
    if(!gameOver)requestAnimationFrame(animate), audio.play();
    else drawGameOver();
}
animate(0);