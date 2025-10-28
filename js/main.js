(function ($) {
    "use strict";

 
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 100, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
autoplayTimeout: 6000, 
        smartSpeed: 2500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

$(document).ready(function () {
  $('.accordion-header').click(function () {
    const body = $(this).next('.accordion-body');
    body.slideToggle();
    $(this).find('span').text(body.is(':visible') ? '-' : '+');
    $('.accordion-body').not(body).slideUp();
    $('.accordion-header span').not($(this).find('span')).text('+');
  });
});





// Add animations inline
 // Animations
  const animStyle = document.createElement('style');
  animStyle.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,191,255,0.6); }
      70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(0,191,255,0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,191,255,0); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;
  document.head.appendChild(animStyle);

  const chatToggle = document.getElementById('chatToggle');
  const chatOptions = document.getElementById('chatOptions');
  const chatIcon = document.getElementById('chatIcon');
  const chatDot = document.getElementById('chatDot');

  let isOpen = false;

  chatToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent immediate close
    isOpen = !isOpen;
    chatOptions.style.display = isOpen ? 'flex' : 'none';
    chatIcon.className = isOpen ? 'fas fa-times' : 'fas fa-comments';
    chatToggle.style.backgroundColor = isOpen ? '#ff5c5c' : '#00bfff';
    chatDot.style.display = isOpen ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!chatToggle.contains(e.target) && isOpen) {
      isOpen = false;
      chatOptions.style.display = 'none';
      chatIcon.className = 'fas fa-comments';
      chatToggle.style.backgroundColor = '#00bfff';
      chatDot.style.display = 'block';
    }
  });