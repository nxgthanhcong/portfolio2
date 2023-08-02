/* To apply this animation to your website, paste the following into your HTML code:
<iframe src="https://codepen.io/tommyho/full/GRwBqWR" width=500 height=500></iframe>
*/

/*
  Sources:
    https://www.youtube.com/watch?v=aEptSB3fbqM
    https://codepen.io/gvissing
  Revised by: tommyho510@gmail.com   
*/

/* --- System Parameters (Recommended)--- */
let bNum = 3;    // Num of bubbles created on movement (3)
let bSize = 8;    // Bubble size (8)
let bSpeed = 6;    // Bubble speed (6)
let bDep = 0.1;  // Bubble depletion speed (0.1)
let bDist = 30;   // Spark length (30)
let bStarVar = 2;    // Num of star variation (2)
let bHue = 4;    // Color change speed (4) 
let cSize = 50;

/* --- Main Program: DO NOT EDIT BELOW --- */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spots = [];
let hue = 0;
let t = 0;

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

class Particle {
    constructor() {
        this.x = mouse.x + Math.cos(t / 10) * cSize;
        this.y = mouse.y + Math.sin(t / 10) * cSize;
        this.size = Math.random() * bSize + 0.1;
        this.speedX = Math.random() * bSpeed - bSpeed / 2;
        this.speedY = Math.random() * bSpeed - bSpeed / 2;
        this.points = Math.floor(Math.random() * bStarVar) + 30; //   
        this.radius = Math.random() * bSize + 0.1;
        this.color = "hsl(" + bHue * hue + ", 100%, 50%)";
        this.deg = 0;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // star(this.x, this.y, this.radius * 2, this.radius, this.points);
        ctx.roundRect(this.x, this.y, this.size, this.size, 2);
        ctx.rotate(this.deg);
        ctx.fill();
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // ctx.fill();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > bDep) this.size -= bDep;
    }
}

function handleParticle() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = i; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            /* if (distance < bDist) {
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 3;
                ctx.moveTo(spots[i].x, spots[i].y);
        // ctx.lineTo(spots[j].x, spots[j].y);
        ctx.bezierCurveTo(spots[j].x, spots[j].y, spots[j].x, spots[i].y, spots[j].x, spots[j].y);
                ctx.stroke();
      }
      */
        }
        if (spots[i].size <= bDep) {
            spots.splice(i, 1);
            i--;
        }
    }
    hue++;
    t++;
}

function star(x, y, radius1, radius2, npoints) {
    let angle = 2 * Math.PI / npoints;
    let halfAngle = angle / 2.0;
    ctx.moveTo(x + Math.cos(0) * radius2, y + Math.sin(0) * radius2);
    for (let a = 0; a < 2 * Math.PI; a += angle) {
        let sx = x + Math.cos(a) * radius2;
        let sy = y + Math.sin(a) * radius2;
        ctx.lineTo(sx, sy);
        sx = x + Math.cos(a + halfAngle) * radius1;
        sy = y + Math.sin(a + halfAngle) * radius1;
        ctx.lineTo(sx, sy);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spots.push(new Particle());
    handleParticle();
    // hue++;
    requestAnimationFrame(animate);
}

animate()