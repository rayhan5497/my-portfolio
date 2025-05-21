const bubbleContainer = document.getElementById('bubbleContainer');

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
}

function getShadowColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
}

function applyRandomGradient(bubble) {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();
  const color4 = getRandomColor();
  const color5 = getRandomColor();
  const color6 = getShadowColor();
  const color7 = getShadowColor();
  const color8 = getShadowColor();
  bubble.style.background = `radial-gradient(circle at 30% 30%, rgb(255, 255, 255), ${color1}, ${color2}, ${color3}, ${color4}, ${color5})`;
  bubble.style.boxShadow = `inset -10px -10px 10px ${color8}, inset 10px 10px 10px ${color7}, 0 0 40px ${color6}`;
}

// Web Audio API
let audioCtx;
let audioBuffer = null;

async function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (!audioBuffer) {
    const response = await fetch('assets/sound/audio6.MP3');
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  }
}

function playBubbleSound(size) {
  if (!audioBuffer || !audioCtx) return;

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;

  // Size & playback-rate mapping
  const minSize = 10;
  const maxSize = 110;
  const normalizedSize = (size - minSize) / (maxSize - minSize);
  const inverted = 1 - normalizedSize;

  // Pitch: small bubble = higher pitch, big = lower pitch
  const minPlayback = 0.2;
  const maxPlayback = 1.7;
  const playbackRate = inverted * (maxPlayback - minPlayback) + minPlayback;
  source.playbackRate.value = playbackRate;

  // Volume: small bubble = louder, big bubble = quieter
  const minVolume = 0.1;
  const maxVolume = 0.6;
  const volume = inverted * (maxVolume - minVolume) + minVolume;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime); 
  gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.5); 

  source.connect(gain).connect(audioCtx.destination);

  const skipOffset = 0.03; 
  source.start(0, skipOffset);
}

function createBubble(event) {
  const size = Math.random() * 100 + 10;
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  bubble.style.left = `${event.clientX - size / 2}px`;
  bubble.style.top = `${event.clientY - size / 2}px`;

  applyRandomGradient(bubble);
  playBubbleSound(size);

  bubbleContainer.appendChild(bubble);

  const lifespan = Math.random() * 1000 + 100;

  const driftType = Math.floor(Math.random() * 3);
  const driftSpeed = Math.random() * 0.6 + 0.5;

  const moveBubble = () => {
    const currentX = parseFloat(bubble.style.left);
    const currentTop = parseFloat(bubble.style.top);
    bubble.style.top = `${currentTop - 1}px`;

    if (driftType === 2) {
      bubble.style.left = `${currentX - driftSpeed}px`;
    } else if (driftType === 1) {
      bubble.style.left = `${currentX + driftSpeed}px`;
    }

    if (bubbleContainer.contains(bubble)) {
      requestAnimationFrame(moveBubble);
    }
  };

  moveBubble();

  setTimeout(() => {
    if (bubbleContainer.contains(bubble)) {
      bubbleContainer.removeChild(bubble);
    }
  }, lifespan);
}

function generateBubbles(event) {
  const bubbleCount = 1;
  for (let i = 0; i < bubbleCount; i++) {
    createBubble(event);
  }
}
function randomDelay() {
  const lifespan = Math.random() * 200;
  return lifespan;
}

let lastBubbleTime = 0;

async function handleMove(event) {
  const now = Date.now();
  if (!audioCtx || !audioBuffer) await initAudio();

  if (now - lastBubbleTime > randomDelay()) {
    const position = event.touches ? event.touches[0] : event;
    generateBubbles(position);
    lastBubbleTime = now;
  }
}

document.addEventListener('mousemove', handleMove);
document.addEventListener('touchmove', handleMove);