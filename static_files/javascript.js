// Function to make background images follow a mouse-over
(function () {
    const bg_parallax = document.getElementsByClassName("bg_parallax"); Array.prototype.forEach.call(bg_parallax, function (el) {
      let bgPos = {
        x: 50,
        y: 50
      };
      const delta = -0.04;
      let reactToTweenUpdate = () => {
        let winW = window.innerWidth / 2;
        let winH = window.innerHeight / 2;
        el.style.backgroundPosition = `${50 - (bgPos.x - winW) * delta}% ${
          50 - (bgPos.y - winH) * delta
        }%`;;
      };
      let tween = new TweenMax(bgPos, 0.9, {
        onUpdate: () => reactToTweenUpdate(),
        ease: Power4.easeOut    
      });
      el.onmousemove = function (event) {
        tween.updateTo(
          {
            x: event.clientX,
            y: event.clientY
          },
          true
        );
      };
    });
})();

// Smooth scroll back top, when user scrolls 50px down the button will show up
let mybutton = document.getElementById("topbutton");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";

  } else {
    mybutton.style.display = "none";
  }
}

// Resets position of the html file 
function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

// When button is clicked smoothscroll backtotop is run
mybutton.addEventListener("click", smoothScrollBackToTop);

// Math.
function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}