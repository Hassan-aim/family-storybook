document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initZIndexes();
});

const leaves = document.querySelectorAll('.leaf');
const book = document.querySelector('.book');
const pageNumDisplay = document.getElementById('page-num');
let currentLeaf = 0;
let isAudioPlaying = false;

// Initialize correct Z-Indexes for the right stack
function initZIndexes() {
  leaves.forEach((leaf, index) => {
    leaf.style.zIndex = leaves.length - index;
  });
}

function startStory() {
  const landing = document.getElementById('landing');
  const storyContainer = document.getElementById('story-container');
  
  landing.style.opacity = '0';
  
  // Try playing audio if user interacted
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
    bgMusic.play().then(() => {
      isAudioPlaying = true;
    }).catch(e => console.log("Audio autoplay prevented", e));
  }
  
  setTimeout(() => {
    landing.style.display = 'none';
    storyContainer.style.display = 'flex';
    
    // Trigger reflow
    void storyContainer.offsetWidth;
    
    storyContainer.style.opacity = '1';
    
    setTimeout(() => {
      book.classList.add('open');
    }, 800);
  }, 1500);
}

function nextPage() {
  if (currentLeaf < leaves.length) {
    leaves[currentLeaf].classList.add('turned');
    // Change z-index so pages stack correctly on the left side
    leaves[currentLeaf].style.zIndex = currentLeaf;
    
    currentLeaf++;
    updateNav();
  }
}

function prevPage() {
  if (currentLeaf > 0) {
    currentLeaf--;
    leaves[currentLeaf].classList.remove('turned');
    // Restore original z-index for the right side
    leaves[currentLeaf].style.zIndex = leaves.length - currentLeaf;
    
    updateNav();
  }
}

function updateNav() {
  if (currentLeaf === 0) {
    pageNumDisplay.innerText = "Cover";
  } else if (currentLeaf > 8) {
    pageNumDisplay.innerText = "";
  } else {
    pageNumDisplay.innerText = currentLeaf + " / 8";
  }
}

function finishStory() {
  const storyContainer = document.getElementById('story-container');
  const finalScreen = document.getElementById('final-screen');
  
  storyContainer.style.opacity = '0';
  
  setTimeout(() => {
    storyContainer.style.display = 'none';
    finalScreen.style.display = 'flex';
    
    // Trigger reflow
    void finalScreen.offsetWidth;
    
    finalScreen.style.opacity = '1';
  }, 1500);
}

function toggleMusic() {
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  
  if (isAudioPlaying) {
    bgMusic.pause();
    musicBtn.style.opacity = '0.5';
    isAudioPlaying = false;
  } else {
    bgMusic.play();
    musicBtn.style.opacity = '1';
    isAudioPlaying = true;
  }
}

// Particle System
function initParticles() {
  const particleContainers = document.querySelectorAll('.particles-bg, #particles');
  
  particleContainers.forEach(container => {
    // Regular glowing particles
    for (let i = 0; i < 40; i++) {
      createParticle(container, false);
    }
    // Heart particles
    for (let i = 0; i < 15; i++) {
      createParticle(container, true);
    }
  });
}

function createParticle(container, isHeart) {
  const p = document.createElement('div');
  p.className = isHeart ? 'particle heart' : 'particle';
  
  if (isHeart) {
    p.innerHTML = '❤️';
  }
  
  // Random horizontal position
  p.style.left = Math.random() * 100 + 'vw';
  
  // Random animation duration (speed)
  const duration = Math.random() * 15 + 10;
  p.style.animationDuration = duration + 's';
  
  // Random delay so they don't all start at once
  p.style.animationDelay = Math.random() * 15 + 's';
  
  // Slightly varying sizes
  if (!isHeart) {
    const size = Math.random() * 3 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
  } else {
    p.style.fontSize = (Math.random() * 10 + 10) + 'px';
  }
  
  container.appendChild(p);
}
