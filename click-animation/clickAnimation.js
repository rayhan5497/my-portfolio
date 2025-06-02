let timeoutId; // Declare a variable to store the timeout ID

document.body.addEventListener('click', function (event) {
  const loadingContainer = document.getElementById('loadingContainer');
  const loadingDot1 = document.querySelector('.loading-dot1');
  const loadingDot2 = document.querySelector('.loading-dot2');

  // Clear any existing timeout to prevent premature hiding
  if (timeoutId) {
    clearTimeout(timeoutId);
    loadingDot1.style.animation = 'none';
    loadingDot2.style.animation = 'none';
    loadingContainer.offsetWidth; // Trigger a reflow to reset the animation
  }

  // Reset the animation
  loadingDot1.style.animation = '';
  loadingDot2.style.animation = '';

  loadingContainer.style.left = `${event.clientX - 25}px`;
  loadingContainer.style.top = `${event.clientY - 25}px`;
  loadingContainer.style.display = 'block';

  timeoutId = setTimeout(() => {
    loadingContainer.style.display = 'none';
  }, 1000);
});