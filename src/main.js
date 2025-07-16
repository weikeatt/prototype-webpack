import '../styles/main.scss'; // Import global styles

// Import Pug templates as functions
// These paths assume your Pug files are in the root 'hero' and 'cards' directories
import heroContentTemplate from '@components/hero/index.pug';
import card1ContentTemplate from '@components/cards/card1/index.pug';
import card2ContentTemplate from '@components/cards/card2/index.pug';

const appElement = document.getElementById('app');

function renderHero() {
  // If hero/index.pug expects any variables, pass them as an object: heroContentTemplate({ varName: 'value' })
  appElement.innerHTML = heroContentTemplate();

  // Attach scroll event listener after rendering
  const scrollContainer = document.querySelector(".dot-scroll");
  const circle = document.querySelector(".circle-hero");
  const dot = document.querySelector(".dot-hero");

  if (!scrollContainer || !circle || !dot) return;

  // Initialize dot position at the start angle
  initializeDotPosition(circle, dot);

  scrollContainer.addEventListener("scroll", () => {
    const scrollY = scrollContainer.scrollTop;
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

    if (maxScroll <= 0) return;

    const scrollPercent = scrollY / maxScroll;

    // Counter-clockwise: start at 300°, end at 200°
    const startAngle = (240 * Math.PI) / 180;
    const endAngle = (170 * Math.PI) / 180;

    // Interpolate angle based on scrollPercent
    const angle = startAngle - scrollPercent * (startAngle - endAngle);

    // Get the bounding rect for absolute positioning relative to the page
    const circleRect = circle.getBoundingClientRect();

    // Reduce radius a bit more to ensure dot stays inside the circle
    const radius = (circle.offsetWidth - dot.offsetWidth) / 2 + 15; // subtract a few px for padding

    // Center of the circle relative to its own bounding box
    const centerX = circleRect.left + circle.offsetWidth / 2;
    const centerY = circleRect.top + circle.offsetHeight / 2;

    // Both x and y follow the circle's circumference
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Position the dot absolutely relative to the viewport
    dot.style.position = "fixed";
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.transform = "translate(-50%, -50%)";
  });
}

function renderCard1() {
  // The original main.pug wrapped card1 content. We replicate that structure here.
  // Pass activeCard for the selector component within card1/index.pug
  const card1Html = card1ContentTemplate({ activeCard: 'card1' });
  appElement.innerHTML = `
    <div class="wrapper">
      <div class="card2-wrapper light">
        ${card1Html}
      </div>
    </div>
  `;
}

function renderCard2() {
  // Pass activeCard for the selector component within card2/index.pug
  const card2Html = card2ContentTemplate({ activeCard: 'card2' });
  appElement.innerHTML = `
    <div class="wrapper">
      <div class="card2-wrapper">
        ${card2Html}
      </div>
    </div>
  `;
}

// Simple Hash-based Router
function router() {
  if (!appElement) {
    console.error("Element with id 'app' not found. Make sure it's in your src/index.pug.");
    return;
  }

  const path = window.location.hash.slice(1) || '/hero'; // Default to '/hero'

  if (path.startsWith('/cards/card1')) {
    renderCard1();
  } else if (path.startsWith('/cards/card2')) {
    renderCard2();
  } else { // Default to hero, including '/'
    renderHero();
  }
}

// Listen for hash changes to re-render
window.addEventListener('hashchange', router);

// Initial render when the DOM is ready
document.addEventListener('DOMContentLoaded', router);

// Initialize dot at the starting angle of the circle
function initializeDotPosition(circle, dot) {
  const startAngle = (240 * Math.PI) / 180;
  const circleRect = circle.getBoundingClientRect();
  const radius = (circle.offsetWidth - dot.offsetWidth) / 2 + 15;
  const centerX = circleRect.left + circle.offsetWidth / 2;
  const centerY = circleRect.top + circle.offsetHeight / 2;

  const x = centerX + radius * Math.cos(startAngle);
  const y = centerY + radius * Math.sin(startAngle);

  dot.style.position = "fixed";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.transform = "translate(-50%, -50%)";
}


