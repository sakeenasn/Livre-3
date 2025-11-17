// Livre qui tombe
anime({
    targets: '#livre',
    top: 300,
    duration: 2000,
    easing: 'easeOutBounce',
    complete: () => {
        // Page qui tourne
        anime({
            targets: '#page1',
            opacity: 1,
            rotateY: ['90deg', '0deg'],
            duration: 1500,
            easing: 'easeOutExpo',
            complete: () => {
                anime({ targets: '#particles', opacity: [0,1], duration: 800, easing: 'easeInOutSine'});
                createParticles();
            }
        });
    }
});

// Particules lumineuses
function createParticles() {
    const container = document.getElementById("particles");
    for (let i = 0; i < 25; i++) {  
        const p = document.createElement("div");
        p.classList.add("particle");
        p.style.left = "100px";
        p.style.top = "100px";
        container.appendChild(p);

        const randomX = (Math.random() - 0.5) * 180;
        const randomY = -Math.random() * 120;

        anime({
            targets: p,
            translateX: randomX,
            translateY: randomY,
            opacity: [0,1,0],
            scale: [0.4,1.3],
            duration: 1500 + Math.random()*800,
            easing: 'easeOutQuad',
            delay: i*100,
            complete: () => p.remove()
        });
    }
}
