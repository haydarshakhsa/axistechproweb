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








 const sendBtn = document.getElementById("sendMessage");
  const userMsg = document.getElementById("userMessage");

const chatToggle = document.getElementById('chatToggle');
const chatOptions = document.getElementById('chatOptions');
const chatIcon = document.getElementById('chatIcon');
const chatDot = document.getElementById('chatDot');
const waDot = document.getElementById('waDot');
const whatsappWindow = document.getElementById('whatsapp-window');
const openWhatsAppChat = document.getElementById('openWhatsAppChat');
const typing = document.getElementById('typing');
const greeting = document.getElementById('greeting');
const chatTime = document.getElementById('chatTime');
const statusText = document.getElementById('status');
const backBtn = document.getElementById('backBtn');

let menuVisible = false;
let chatOpen = false;


function stopAnimation() {
  if (!chatToggle) return console.warn('chatToggle not found');
  // remove class safely
  if (chatToggle.classList.contains('animate')) {
    chatToggle.classList.remove('animate');
    // force reflow so browser stops animation immediately
    // eslint-disable-next-line no-unused-expressions
    void chatToggle.offsetWidth;
  }
  // also clear any inline animation style that might be present
  chatToggle.style.animation = '';
}

function startAnimation() {
  if (!chatToggle) return console.warn('chatToggle not found');

  // Fully reset before restarting
  chatToggle.classList.remove('animate');
  chatToggle.style.animation = 'none';

  // Force browser reflow (this resets animation timing)
  void chatToggle.offsetWidth;

  // Clear inline style and re-add the animation class
  chatToggle.style.animation = '';
  chatToggle.classList.add('animate');
}


  sendBtn.addEventListener("click", function() {
    const number = "12263857909"; // Your WhatsApp number in international format
    const message = encodeURIComponent(userMsg.value.trim());
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;
    window.open(url, "_blank");
  });

// Toggle floating chat button
chatToggle.onclick = () => {
  if (chatOpen) {
    // Close WhatsApp chat if open
    whatsappWindow.style.display = "none";
    chatIcon.className = "fas fa-comments";
    chatToggle.style.backgroundColor = "#00bfff";
    chatOpen = false;
    waDot.style.display = "block";
      chatDot.style.display="none";
  } else {
    // Toggle dropdown
    if (menuVisible) {
      chatOptions.style.display = "none";
      chatIcon.className = "fas fa-comments";
      chatToggle.style.backgroundColor = "#00bfff";
          chatDot.style.display = "none";
    } else {
      chatOptions.style.display = "flex";
      chatIcon.className = "fas fa-times";
      chatToggle.style.backgroundColor = "red";
          chatDot.style.display = "none";
      
          stopAnimation();
        
    }
    menuVisible = !menuVisible;
  }
};

// Open WhatsApp Chat
openWhatsAppChat.onclick = () => {

      stopAnimation();
  chatOptions.style.display = "none";
  whatsappWindow.style.display = "block";
  chatIcon.className = "fas fa-times";
  chatToggle.style.backgroundColor = "red";
  chatOpen = true;
  menuVisible = false;
  waDot.style.display = "none";
  chatDot.style.display = "none";

  // Simulate typing
  statusText.innerHTML = "typing...";
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  chatTime.textContent = `${h}:${m < 10 ? "0" + m : m} ${ampm}`;
  typing.style.display = "flex";
  greeting.style.display = "none";
  setTimeout(() => {
    typing.style.display = "none";
    greeting.style.display = "block";
    statusText.innerHTML = "<span style='background:#25d366;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px;'></span>Online";
  }, 2200);
};

// Back button closes WhatsApp chat
backBtn.onclick = () => {
  whatsappWindow.style.display = "none";
  chatIcon.className = "fas fa-comments";
  chatToggle.style.backgroundColor = "#00bfff";
  chatOpen = false;
  waDot.style.display="true";
    chatDot.style.display="block";
    waDot.style.display="block";
    startAnimation();
    
};