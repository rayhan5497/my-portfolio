const starContainer = document.querySelectorAll('.starContainer');
// const lastStarContainer = starContainer[starContainer.length - 1];
// if (lastStarContainer) lastStarContainer.style.height = '100vh';

let initialStar = document.querySelector('.star');
console.log(initialStar);
const stars = [];

while (stars.length < 8) {
  const clonedStar = initialStar.cloneNode(true);
  stars.push(clonedStar);
}
initialStar.remove();

starContainer.forEach((container, index) => {
  for (let i = 0; i < 4; i++) {
    const starIndex = index * 4 + i;
    container.appendChild(stars[starIndex]);
  }
});

// const domStars = starContainer.querySelectorAll('.star');
// domStars.forEach(star => {
//   for (let i = 0; i < 4; i++) {
//     star.style.transform = 'translateY(100vh)';
//   }
// })

const orbits = [];

stars.forEach((star, index) => {
  const orbitRadius = Math.random() * 100 + 50; // 50–150px orbit
  const centerX = Math.random() * window.innerWidth;
  const centerY = Math.random() * window.innerHeight;
  const speed = Math.random() * 0.002 + 0.009; // Rotation speed
  const angleOffset = Math.random() * Math.PI * 2; // Starting angle

  // Store orbit data
  orbits.push({
    star,
    centerX,
    centerY,
    radius: orbitRadius,
    speed,
    angle: angleOffset,
  });

  // Set initial position
  star.style.position = 'absolute';
  star.style.left = '0px';
  star.style.top = '0px';
});

function animateOrbits() {
  orbits.forEach((orbit) => {
    orbit.angle += orbit.speed;

    const x = orbit.centerX + Math.cos(orbit.angle) * orbit.radius;
    const y = orbit.centerY + Math.sin(orbit.angle) * orbit.radius;

    orbit.star.style.transform = `translate(${x}px, ${y}px)`;
  });

  requestAnimationFrame(animateOrbits);
}

animateOrbits();
