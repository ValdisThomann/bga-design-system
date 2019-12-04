/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {


    
    /*----------- General page issues ----------- */
    
    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    /*----------- Coming soon ----------- */
    $('.coming-soon').append("<div class='coming-soon-label'><p>Coming soon</p></div>");
    $('.coming-soon a').on('click', function(e){
            e.preventDefault();
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
    $('.float-button').on('click', function(){
        if($(this).parents('element-design').hasClass('unavailable')) {
            return;
        } else {
            $(this).parent().toggleClass('closed');
            $(this).parent().next('.element-code').toggleClass('open');
            var icon = $(this).find('.BgaIcon');
            $(icon).toggleClass('open');
        }
    });
    
    
    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function to change active side menu state on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {
        
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
    
    
    
    /*----------- Tables ----------- */
    $('tr td:first-of-type').on('click', function(){
        
        //toggle class to show / hide child <td>
        var parent = $( this ).parent().get( 0 );
        $(parent).children('td').toggleClass('showGroup');
        
        //toggle class on parent
        $(parent).toggleClass('groupParent');
        
    });
    
    
    /*----------- Accordion example ----------- */
    
    $('.accordion-group-toggle-content').on('click', function(){
        // Open all / close all button functionality.
        if ($(this).hasClass('all-open')) {
            $(this).removeClass('all-open');
            $(this).children('h5').text('Open all');
            $('.accordion-item-tile').removeClass('open');
            $('.accordion-item-content').removeClass('visible');
        } else {
            $(this).addClass('all-open');
            $(this).children('h5').text('Close all');
            $('.accordion-item-tile').addClass('open');
            $('.accordion-item-content').addClass('visible');
        }
    });
    
    $('.accordion-item-tile').on('click', function(){
        // Toggle classes to show / hide accordion content
        $(this).toggleClass('open');
        $(this).next('.accordion-item-content').toggleClass('visible');
        
        // Check if all items are OPEN OR CLOSED and change the text and arrow of the accordion button accordingly.
        var open_items = [],
            closed_items = [];
        $('.accordion-item-content').each(function(i){  
            if ($(this).hasClass('visible')){
                open_items.push(i); 
            } else {
                closed_items.push(i);
            }
        });   
        if ($('.accordion-item-content').length == open_items.length) {
            $('.accordion-group-toggle-content').addClass('all-open'); 
            $('.accordion-group-toggle-content h5').text('Close all');  
        } else if ($('.accordion-item-content').length == closed_items.length) {
            $('.accordion-group-toggle-content').removeClass('all-open'); 
            $('.accordion-group-toggle-content h5').text('Open all');
        }
        
    });
    
    
    /*----------- Pagination ----------- */
    // Change current state on when click on page number
    $('.pagination-container a.page').on('click', function(){
        $('.pagination-container a').each(function(){
            $(this).removeClass('current');
        });  
        $(this).addClass('current');
    });
    // Change current state to first page number on 'First' link click
    $('.pagination-container a.first').on('click', function(){
        $('.pagination-container a').each(function(){
            $(this).removeClass('current');
            $('.pagination-container a.page').first().addClass('current');
        });  
    });
    // Change current state to last page number on 'Last' link click
    $('.pagination-container a.last').on('click', function(){
        $('.pagination-container a').each(function(){
            $(this).removeClass('current');
            $('.pagination-container a.page').last().addClass('current');
        });  
    });
    // Change current state to previous page number on 'Previous' link click
    $('.pagination-container a.previous').on('click', function(){
        var current_pos;
        $('.pagination-container a.page').each(function(i){
            if($(this).hasClass('current')) {
                current_pos = i;
                $(this).removeClass('current');
                console.log(current_pos);
            }
        }); 
        var new_pos = $('.pagination-container a.page').get(current_pos - 1);
        if (current_pos > 0){
            $(new_pos).addClass('current');
        } else {
            $('.pagination-container a.page').first().addClass('current');
        }
    });
    // Change current state to next page number on 'Next' link click
    $('.pagination-container a.next').on('click', function(){
        var current_pos;
        $('.pagination-container a.page').each(function(i){
            if($(this).hasClass('current')) {
                current_pos = i;
                $(this).removeClass('current');
                console.log(current_pos);
            }
        }); 
        var new_pos = $('.pagination-container a.page').get(current_pos + 1);
        if (current_pos <= $('.pagination-container a.page').get.length){
            $(new_pos).addClass('current');
        } else {
            $('.pagination-container a.page').last().addClass('current');
        }
    });
    

    
}); // END doc ready

