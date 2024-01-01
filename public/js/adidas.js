// document.addEventListener('DOMContentLoaded', function() {
    const navbarImage = document.querySelector('.navbar-brand img');
    const navbarUl = document.querySelector('.navbar-nav');
    const searchField = document.getElementById('search_field');
    const collapseButton = document.querySelector('.navbar-toggler');
    const cartLogo = document.querySelector('.btn');
    gsap.to(navbarImage,{
  x:530,
  duration:1.5,
  stagger: 0.1,
  scale:1.3,
  ease: "power1.out",
  delay:0.1,
 scrollTrigger:{
    trigger:navbarImage,
    // trigger:".b2",
    start:"top top%",
    toggleActions:"play none reverse none",
    // markers:true

 }
 })
     gsap.to([navbarUl, searchField, collapseButton,cartLogo],{
  y:-80,
  opacity: 0, 
   duration: 0.5, 
   stagger: 0.1, 
   ease: 'power2.out',
   
 scrollTrigger:{
    trigger:[navbarUl, searchField, collapseButton,cartLogo] ,
    // trigger:".b2",
    start:"top top",
    toggleActions:"play none reverse none",
    // markers:true

 }
 })
gsap.from('.navbar-nav li', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, "-=0.5");

  // Animation for the search field and cart button
gsap.from('#search_field, .btn-success', { opacity: 0, duration: 1, x: 20, ease: 'power2.out' }, "-=0.5");

  // Animation for the collapse button
gsap.from('.navbar-toggler', { opacity: 0, duration: 1, y: -20, ease: 'power2.out' }, "-=0.5");
  



// ******************column right-**************
 
 


//     // Initial state
//     gsap.set([navbarUl, searchField, collapseButton], { opacity: 1 });
  
//     window.addEventListener('scroll', function() {
//       const scrollY = window.scrollY;
  
//       // Hide elements
//       gsap.to([navbarUl, searchField, collapseButton], { opacity: 0, duration: 0.3 });
  
//       // Move image
//       gsap.to(navbarImage, { x: 200, duration: 0.3 });
//     });
  
//     // Reset on scroll end (optional)
//     window.addEventListener('scroll', debounce(resetNavbar, 300));
  
//     function resetNavbar() {
//       gsap.to([navbarUl, searchField, collapseButton], { opacity: 1, duration: 0.3 });
//       gsap.to(navbarImage, { x: 0, duration: 0.3 });
//     }
  
//     function debounce(func, wait, immediate) {
//       let timeout;
//       return function() {
//         const context = this;
//         const args = arguments;
//         const later = function() {
//           timeout = null;
//           if (!immediate) func.apply(context, args);
//         };
//         const callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//       };
//     }
//   });
  