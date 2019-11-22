/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {


    
    /*----------- General page issues ----------- */
    
    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    // Hide empty breadcrumb links and arrows
    $('a.breadcrumb-link').each(function(){
        if( $(this).is(':empty') ) {
            var wrapper = $(this).parent('.breadcrumb-home-wrapper');
            $(wrapper).css('display', 'none');
        }
    });
    
    
    // Header navigation links
    $('#foundations-link').on('click',function(){
        window.location.pathname = "/topic-foundations.html";
    });
    $('#components-link').on('click',function(){
        window.location.pathname = "/topic-components.html";
    });
    $('#page-patterns-link').on('click',function(){
        window.location.pathname =  "/topic-page-patterns.html";
    });
       
    
    
    /*----------- Design system cards ----------- */
    $('.element-design').on('click', function(){
        $(this).toggleClass('closed');
        $(this).next('.element-code').toggleClass('open');
    });
    
    
    
    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function to change active side menu state on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {
        console.log(positions);    
        for ( var i = 0; i < positions.length; i++) {
                var top_position = positions[i] - 40;
                if ( $(window).scrollTop() >= top_position) {
                    $('.anchor-menu a').removeClass('active-sticky');
                    $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
                }
            }
        }
    
    if ($( ".anchor-menu .sticky-container" ).length) {
    
        // Get text from each sticky list a-tag and convert it into an id.
        // Replace spaces with hyphens and remove numerical characters & punctuation at the start where necessary       
        var sticky_list_2 = {};
        $('.anchor-menu a').each(function(){
            var a_text = $(this).text(),
                text_no_num = a_text.replace(/[0-9]/g, ''),
                text_no_punctuation = text_no_num.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\']/g,''),
                final_text = text_no_punctuation.trim();
        
            var a_lower_text = final_text.replace(/\s+/g, '-').toLowerCase();
            sticky_list_2[a_text] = a_lower_text;
            
        }); 

     
        // Side menu stickyness
        if ($(window).width() > 480) {
            $('.anchor-menu').css('position','relative');
                var stickyPosition = $('.anchor-menu').offset(),
                    stickyWidth = $('.twoCol39-left').width(),
                    footerPosition = $('.footer-wrapper').offset(),
                    stickyHeight = $('.sticky-container ul').height(),
                    footerHeight = $('.footer-wrapper').height(),
                    pageHeight = $(document).height(),
                    unstickyPosition = pageHeight - footerHeight - stickyHeight - 60;
        
            $('.anchor-menu').css('width',stickyWidth);
    
            $(window).scroll(function(){
                if($(window).scrollTop() > stickyPosition.top && $(window).scrollTop() < unstickyPosition){
                    $('.anchor-menu').css('position','fixed').css('top','0');
                } else {
                    $('.anchor-menu').css('position','relative');
                }    
            });
            $(window).resize(function(){
                var stickyWidth = $('.twoCol39-left').width();
                $('.anchor-menu').css('width',stickyWidth);
            });
        }
    
        
        // Side menu scroll to section of the page
        // And add top position of element to anchor link as a data-value
        $('.anchor-menu a').each(function(){
            var a_text = $(this).text(),
                element_id = '#' + sticky_list_2[a_text],
                element_position = $(element_id).offset();
            $(this).attr('data-value', Math.round(element_position.top));
        
            $(this).on('click', function(){
                $([document.documentElement, document.body]).animate(
                    { scrollTop: $(element_id).offset().top }, 400);
                $('.anchor-menu a').removeClass('active-sticky');
                $(this).addClass('active-sticky');
            });
        });    
        
    
        // Change menu active state on scroll to different sections of the page
        var positions = [];
        $('.anchor-menu a').each(function(){
            var element_position = $(this).attr('data-value');
            positions.push(Math.round(element_position));
        }); 
    
        $(window).scroll(function(){
            add_position(positions); 
        });
    
    } // END if .anchor-menu .sticky-container EXISTS
    
    
    
   
    

    
}); // END doc ready

