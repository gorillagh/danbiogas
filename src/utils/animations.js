// animations.js - Utility functions for scroll animations

export const setupScrollAnimations = () => {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
};

// Add staggered delay to children elements
export const setupStaggeredAnimations = (
  parentSelector,
  childSelector,
  baseDelay = 100
) => {
  const parents = document.querySelectorAll(parentSelector);

  parents.forEach((parent) => {
    const children = parent.querySelectorAll(childSelector);

    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * baseDelay}ms`;
    });
  });
};

// Set up parallax scrolling effect
export const setupParallaxEffect = (selector, factor = 0.2) => {
  const elements = document.querySelectorAll(selector);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;

    elements.forEach((element) => {
      const elementTop = element.offsetTop;
      const distance = scrollTop - elementTop;

      // Apply transform only when element is in view
      if (
        scrollTop + window.innerHeight > elementTop &&
        scrollTop < elementTop + element.offsetHeight
      ) {
        element.style.transform = `translateY(${distance * factor}px)`;
      }
    });
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};

// Set up counter animation
export const animateCounter = (
  element,
  target,
  duration = 2000,
  startValue = 0
) => {
  let start = null;
  let current = startValue;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    current = startValue + progress * (target - startValue);

    element.textContent = Math.floor(current);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  };

  window.requestAnimationFrame(step);
};
