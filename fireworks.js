(function () {
  const canvas = document.getElementById('firework-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  function randomColor() {
    const colors = ['#ff5e7e', '#ffd6a5', '#fdffb6', '#caffbf', '#a0c4ff', '#bdb2ff', '#ffffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function spawnBurst(x, y) {
    const count = 40 + Math.floor(Math.random() * 20);
    const color = randomColor();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: 2 + Math.random() * 2,
      });
    }
  }

  function tick() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // gravity
      p.alpha -= 0.012;
    });

    particles = particles.filter(p => p.alpha > 0);

    particles.forEach(p => {
      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    animationId = requestAnimationFrame(tick);
  }

  function randomBurstLoop() {
    spawnBurst(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.6 + canvas.height * 0.1
    );
    burstTimer = setTimeout(randomBurstLoop, 500 + Math.random() * 600);
  }

  let burstTimer = null;

  window.startFireworks = function () {
    resize();
    particles = [];
    if (animationId) cancelAnimationFrame(animationId);
    tick();
    randomBurstLoop();
  };
})();
