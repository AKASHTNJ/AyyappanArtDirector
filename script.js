 const canvas = document.getElementById("sketchCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Sketch line object
class SketchLine {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 80 + 20;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.5 + 0.2;
    this.progress = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    ctx.moveTo(this.x, this.y);

    const dx = Math.cos(this.angle) * this.length * this.progress;
    const dy = Math.sin(this.angle) * this.length * this.progress;

    ctx.lineTo(this.x + dx, this.y + dy);
    ctx.stroke();

    this.progress += this.speed / 100;
  }
}

let lines = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (lines.length < 80) {
    lines.push(new SketchLine());
  }

  lines.forEach((line, index) => {
    line.draw();
    if (line.progress >= 1) {
      lines.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
