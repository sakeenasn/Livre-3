const book = document.getElementById('book');
const toggleThemeBtn = document.getElementById('toggleTheme');
const openBookBtn = document.getElementById('openBook');
const body = document.body;

let pageIndex = 0;
const pages = book.querySelectorAll('.page');

// Ouvrir et tourner les pages du livre
openBookBtn.addEventListener('click', () => {
  pageIndex++;
  if (pageIndex > pages.length) pageIndex = 1;
  const angle = pageIndex * 180;
  book.style.transform = `rotateY(-${angle}deg)`;
  createParticles();
});

// Changer thème
toggleThemeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
});

// ===== Particules Magiques =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function createParticles() {
  let particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: window.innerWidth/2,
      y: window.innerHeight/2,
      size: Math.random()*4+2,
      speedX: (Math.random()-0.5)*6,
      speedY: (Math.random()-1.5)*6,
      alpha: 1,
      color: `hsl(${Math.random()*360}, 100%, 70%)`
    });
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p, i) => {
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= 0.02;
    });
    particles = particles.filter(p => p.alpha > 0);
    if(particles.length > 0) requestAnimationFrame(animate);
  }

  animate();
}
