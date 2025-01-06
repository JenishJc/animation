jQuery(document).ready(function () {
    jQuery('#owl-demo').owlCarousel({
        loop: true,
        rtl: false,
        margin: 70,
        dots: false,
        nav: false,
        autoplay: true,
        autoplaySpeed: 10500, 
        
        slideTransition: 'linear', 
        responsive: {
          0: {
            items: 1,
            autoWidth: true
          },
          768: {
            items: 3,
            autoWidth: true 
          },
          1000: {
            items: 7,
            autoWidth: true 
          },
        },
        
        smartSpeed: 1000,
        afterAction: function() {
            $('.owl-carousel .item').not(':last-child').each(function() {
                $(this).append('<span class="big-dot">.</span>');
            });
        }
    });
});
