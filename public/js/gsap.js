document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP timeline
  const tl = gsap.timeline();

  // Animation for the logo
  tl.from('.navbar-brand img', { opacity: 0, duration: 1, y: -20, ease: 'power2.out' });

  // Animation for the navbar items
  tl.from('.navbar-nav li', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, "-=0.5");

  // Animation for the search field and cart button
  tl.from('#search_field, .btn-success', { opacity: 0, duration: 1, x: 20, ease: 'power2.out' }, "-=0.5");

  // Animation for the collapse button
  tl.from('.navbar-toggler', { opacity: 0, duration: 1, y: -20, ease: 'power2.out' }, "-=0.5");

  // Optionally, you can add more animations or customize the existing ones as needed.
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP timeline
  const tl = gsap.timeline();

  // Animation for the "Brands" header
  tl.from('.brands h1', { opacity: 0, y: 20, duration: 1, ease: 'power2.out' });

  // Animation for each brand logo
  tl.from('.nike-logo-1, .adidas-logo-1, .air-jordan-jumpman-logo-1, .new-balance-logo-1', 
    { opacity: 0, y: 20, duration: 0.5, stagger: 0.2, ease: 'power2.out' }, "-=0.5");

  // Optionally, you can add more animations or customize the existing ones as needed.
});


let prevScrollPos = window.scrollY;
const navbar = document.querySelector('.navbar');

function handleScroll() {
  let currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    // User is scrolling up
    navbar.style.transform = 'translateY(0)';
  } else {
    // User is scrolling down
    navbar.style.transform = `translateY(-${navbar.offsetHeight}px)`;
  }

  prevScrollPos = currentScrollPos;
}

window.addEventListener('scroll', handleScroll);
