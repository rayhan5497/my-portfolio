// FOR MENU BUTTION
const menuButtonContainer = document.querySelector('.manuButtonContainer');
const menuButtonContainedContainer = document.querySelector(
  '.manuButtonContainedContainer'
);
const manuButton = document.querySelector('.manuButton');
const navMenu = document.querySelector('.navManu');
const navManuContainer = document.querySelector('.navManuContainer');

let menuOpen = false;

menuButtonContainer.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navMenu.classList.toggle('open', menuOpen);
  manuButton.classList.toggle('open', menuOpen);
  navManuContainer.classList.toggle('open', menuOpen);
  menuButtonContainedContainer.classList.toggle('open');
  menuButtonContainer.classList.toggle('open');
});

// FOR LOADING DOT
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

// FOR TYPE WRITER BOTTOM LINE
document.addEventListener('DOMContentLoaded', function () {
  const text = 'l Get your desired Web Site and Application...';
  const bottomLine = document.querySelector('.bottomLine');
  let index = 0;
  let repeatCount = 0;
  const repeatLimit = 12;
  const lastThreeLetters = text.slice(-4);
  let blinkCount = 0;
  const blinkLimit = 7;

  function typeWriter() {
    if (blinkCount < blinkLimit * 2) {
      if (blinkCount % 2 === 0) {
        bottomLine.textContent = text.charAt(0);
      } else {
        bottomLine.textContent = '';
      }
      blinkCount++;
      setTimeout(typeWriter, 400);
    } else if (blinkCount === blinkLimit * 2) {
      bottomLine.textContent = '';
      index++;
      blinkCount++;
      setTimeout(typeWriter, 0);
    } else if (index < text.length - 4) {
      // Main text animation
      if (text.charAt(index) === ' ') {
        const spaceSpan = document.createElement('span');
        spaceSpan.textContent = ' ';
        spaceSpan.classList.add('fade-in');
        bottomLine.appendChild(spaceSpan);
        setTimeout(() => spaceSpan.classList.add('visible'), 10);
        index++;
        typeWriter();
      } else {
        const charSpan = document.createElement('span');
        charSpan.textContent = text.charAt(index);
        charSpan.classList.add('fade-in');
        bottomLine.appendChild(charSpan);
        setTimeout(() => charSpan.classList.add('visible'), 10);
        index++;
        setTimeout(typeWriter, 100);
      }
    } else if (index < text.length) {
      // Last three letters animation
      const charSpan = document.createElement('span');
      charSpan.textContent = text.charAt(index);
      charSpan.classList.add('fade-in');
      bottomLine.appendChild(charSpan);
      setTimeout(() => charSpan.classList.add('visible'), 10);
      index++;
      setTimeout(typeWriter, 500);
    } else if (repeatCount < repeatLimit) {
      // Repeating the last three letters
      bottomLine.textContent =
        text.slice(1, -4) + lastThreeLetters.slice(0, (repeatCount % 4) + 1);
      repeatCount++;
      setTimeout(typeWriter, 500);
    } else {
      // Restarting the animation
      setTimeout(() => {
        bottomLine.textContent = '';
        index = 0;
        repeatCount = 0;
        blinkCount = 0;
        typeWriter();
      }, 5000);
    }
  }
  typeWriter();

  // FOR MAIN BOX ELEMENTS ANIMATION
  const professional = document.querySelector('.professional');
  const upToDateDesign = document.querySelector('.upToDateDesign');
  const responsiveAndSecure = document.querySelector('.responsiveAndSecure');
  const header = document.querySelector('header');
  const mainAndFooter = document.querySelector('.mainAndFooter');

  let elements = [professional, upToDateDesign, responsiveAndSecure];
  let currentIndex = 0;
  let nextIndex = 0;
  let prevIndex = 0;
  let isScrolling = false;

  const starContainer = document.querySelectorAll('.starContainer');

  function updatePositions() {
    elements.forEach((el, index) => {
      el.style.width = index === currentIndex ? '100vw' : '0';
      el.style.opacity = index === currentIndex ? '1' : '0';
      el.style.zIndex = index === currentIndex ? '1' : '0';
      el.style.fontSize = index === currentIndex ? '' : '0vw';
    });

    nextIndex = (currentIndex + 1) % elements.length;
    prevIndex = (currentIndex - 1 + elements.length) % elements.length;

    elements[nextIndex].style.right = 'auto';
    elements[nextIndex].style.left = 'auto';
    elements[prevIndex].style.left = 'auto';
    elements[prevIndex].style.right = 'auto';
  }

  const lastContainer = starContainer[starContainer.length - 1];
  const stars = lastContainer.querySelectorAll('.star');
  function starColorChange() {
    if (isScrolling) {
      elements.forEach((el, index) => {
        stars.forEach((star) => {
          if (index === nextIndex) {
            star.style.backgroundColor = 'red';
          } else if (index === prevIndex) {
            star.style.backgroundColor = 'green';
          } else if (index === currentIndex) {
            star.style.backgroundColor = 'purple';
          }
        });
      });
    }
  }

  function onScroll(event) {
    if (isScrolling) return;

    isScrolling = true;
    if (event.deltaY > 0) {
      // Scrolling down (forward)
      currentIndex = (currentIndex + 1) % elements.length;
    } else {
      // Scrolling up (backward)
      currentIndex = (currentIndex - 1 + elements.length) % elements.length;
    }
    updatePositions();
    starColorChange();

    setTimeout(() => {
      isScrolling = false;
    }, 500);
  }

  function preventScroll(event) {
    event.preventDefault();
  }

  mainAndFooter.addEventListener('mouseover', () => {
    window.addEventListener('wheel', onScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });
  });

  mainAndFooter.addEventListener('mouseleave', () => {
    window.removeEventListener('wheel', onScroll);
    window.removeEventListener('wheel', preventScroll);
  });

  updatePositions();

  // FOR PAGE UP AND DOWN SCROLLING
  function scrollPage(direction) {
    updatePositions();
    window.scrollBy({
      top: direction === 'down' ? window.innerHeight : -window.innerHeight,
      behavior: 'smooth',
    });
    starColorChange();
  }

  function handleScroll(event, direction) {
    event.preventDefault();
    if (!isScrolling) {
      isScrolling = true;
      scrollPage(direction);
      setTimeout(() => {
        isScrolling = false;
      }, 500);
    }
  }

  header.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      handleScroll(event, 'down');
    }
  });

  mainAndFooter.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
      handleScroll(event, 'up');
    }
  });
});
