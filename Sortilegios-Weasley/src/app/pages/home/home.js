// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Generador de efectos mágicos de fondo
  const magicBg = document.getElementById('magicBg');
  
  // Verificar que el elemento existe
  if (!magicBg) {
    console.error('No se encontró el elemento magicBg');
    return;
  }

  // Colores mágicos para efectos
  const colors = [
    '#ff9d3d', '#ffd700', '#ff6b9d', '#9333ea', 
    '#22d3ee', '#10b981', '#f59e0b', '#ef4444'
  ];

  // Crear fuegos artificiales
  function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + '%';
    firework.style.top = Math.random() * 80 + 10 + '%';
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
    firework.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
    firework.style.animationDelay = Math.random() * 2 + 's';
    firework.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
    
    magicBg.appendChild(firework);
    
    setTimeout(() => firework.remove(), 4000);
  }

  // Crear chispas flotantes
  function createSpark() {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = Math.random() * 100 + '%';
    spark.style.bottom = '0';
    spark.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
    spark.style.animationDelay = Math.random() * 3 + 's';
    spark.style.animationDuration = (Math.random() * 4 + 6) + 's';
    spark.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
    
    magicBg.appendChild(spark);
    
    setTimeout(() => spark.remove(), 12000);
  }

  // Crear explosiones de colores
  function createColorBurst() {
    const burst = document.createElement('div');
    burst.className = 'color-burst';
    burst.style.left = Math.random() * 100 + '%';
    burst.style.top = Math.random() * 100 + '%';
    burst.style.animationDelay = Math.random() * 2 + 's';
    burst.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}80, transparent)`;
    
    magicBg.appendChild(burst);
    
    setTimeout(() => burst.remove(), 3500);
  }

  // Crear humo mágico
  function createMagicSmoke() {
    const smoke = document.createElement('div');
    smoke.className = 'magic-smoke';
    smoke.style.left = Math.random() * 100 + '%';
    smoke.style.bottom = '0';
    smoke.style.animationDelay = Math.random() * 3 + 's';
    smoke.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}40, transparent)`;
    
    magicBg.appendChild(smoke);
    
    setTimeout(() => smoke.remove(), 6500);
  }

  // Crear destellos pop
  function createMagicPop() {
    const pop = document.createElement('div');
    pop.className = 'magic-pop';
    pop.style.left = Math.random() * 100 + '%';
    pop.style.top = Math.random() * 100 + '%';
    pop.style.animationDelay = Math.random() * 1 + 's';
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    pop.style.background = `radial-gradient(circle, ${color1}, ${color2}, transparent)`;
    
    magicBg.appendChild(pop);
    
    setTimeout(() => pop.remove(), 2500);
  }

  // Generar efectos continuamente
  setInterval(createFirework, 800);
  setInterval(createSpark, 400);
  setInterval(createColorBurst, 1200);
  setInterval(createMagicSmoke, 1000);
  setInterval(createMagicPop, 600);

  // Generar efectos iniciales
  for (let i = 0; i < 5; i++) {
    setTimeout(createFirework, i * 200);
    setTimeout(createSpark, i * 150);
    setTimeout(createColorBurst, i * 300);
    setTimeout(createMagicSmoke, i * 250);
    setTimeout(createMagicPop, i * 180);
  }
});