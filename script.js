const book = document.getElementById('book');
const toggleThemeBtn = document.getElementById('toggleTheme');
const toggleBackgroundBtn = document.getElementById('toggleBackground');
const body = document.body;

let isOpen = false;
let pageIndex = 0;
const pages = book.querySelectorAll('.page');
const backgrounds = ['bg-stars', 'bg-library'];
let bgIndex = 0;

// Livre qui s'ouvre au clic
book.addEventListener('click', () => {
  pageIndex++;
  if(pageIndex > pages.length) pageIndex = 1;
  const angle = pageIndex * 180;
  book.style.transform = `rotateY(-${angle}deg)`;
  createParticles();
});

// Changement de thème clair/sombre
toggleThemeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
});

// Changement de fond
toggleBackgroundBtn.addEventListener('click', () => {
  body.classList.remove(backgrounds[bgIndex]);
  bgIndex = (bgIndex + 1) % backgrounds.length;
  body.classList.add(backgrounds[bgIndex]);
});

// Particules magiques
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function createParticles() {
  const particles = [];
  for(let i=0;i<50;i++){
    particles.push({
      x: window.innerWidth/2,
      y: window.innerHeight/2,
      size: Math.random()*5+2,
      speedX: (Math.random()-0.5)*5,
      speedY: (Math.random()-1.5)*5,
      alpha: 1
    });
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      ctx.fillStyle = `rgba(255,215,0,${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= 0.02;
    }
    particles = particles.filter(p => p.alpha > 0);
    if(particles.length>0){
      requestAnimationFrame(animate);
    }
  }
  animate();
}
