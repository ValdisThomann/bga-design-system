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
            $(wrapper).remove();
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
       
    
    
    /*----------- Design system card open/close functionality ----------- */
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
    
    // Function for menu stickiness on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {

        for (var i = 0; i < positions.length; i++) {
            var top_position = positions[i] - 40;
            if ($(window).scrollTop() >= top_position) {
                $('.anchor-menu a').removeClass('active-sticky');
                $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
            }
        }
    }
    
    
    // Function to make the side menu sticky
    var stickyPosition = $('.anchor-menu').offset(); //This var is outside the function because it needs to be determined BEFORE window resizing,.
    function menuStickiness() {
        
        var win = $(window),
            stickyWidth = $('.twoCol39-left').width();
        
        // Set side-menu initial horizontal position 
        if(win.width() < 575) {
            $('.anchor-menu').css('position', 'relative').css('top', 'auto');
        } else if (win.width() >= 575) {
            if (win.scrollTop() >= stickyPosition.top) {
                $('.anchor-menu').css('position', 'fixed').css('top', '0').css('width', stickyWidth);
            } else {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            }
        } 
        
        // Reset side-menu position on scroll
        $(window).scroll(function () {

            stickyWidth = $('.twoCol39-left').width();

            if (win.width() < 575) {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            } else if (win.width() >= 575) {
                if (win.scrollTop() >= stickyPosition.top) {
                    $('.anchor-menu').css('position', 'fixed').css('top', '0').css('width', stickyWidth);
                } else if (win.scrollTop() < stickyPosition.top) {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                }
            }
        });
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

        // Apply menu stickiness
        menuStickiness();
    
        
        // Side menu scroll to section of the page
        // and add top position of element to anchor link as a data-value
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
    
    
    // Menu stickiness on .resize()
    $(window).on('resize', function(){
        if ($( ".anchor-menu .sticky-container" ).length) {
            menuStickiness();
        }
    });
    
    
    /*----------- Responsive view toggle ----------- */
    $('.responsive-toggle-container input').on('click', function(){
        var design_card = $(this).parents('.design-system-card');
        $(design_card[0]).find(".example-wrapper").toggleClass("mobile-example");
    });
    
    if ($(window).width() < 650) {
        $('.example-wrapper').addClass('mobile-media-query');
    } else if ($(window).width() >= 650) {
            $('.example-wrapper').removeClass('mobile-media-query');
    }
    
    $(window).on('resize', function () {
        if ($(window).width() < 650) {
            $('.example-wrapper').addClass('mobile-media-query');
        } else if ($(window).width() >= 650) {
            $('.example-wrapper').removeClass('mobile-media-query');
        }
    });
    
    
    /*----------- View state toggle ----------- */
    $('.state-selector label').on('click', function(){
        var element_state = $(this).attr('data-state'); 
        
        if ($(this).find('input').attr('checked') == "checked") {
        } else  {
            $(this).parent().find('label input').each(function(){
                $(this).removeAttr('checked');
            });
            $(this).find('input'). attr("checked", "checked");
        }
        $(this).closest('.design-system-card').find('.design-system-card-content .example').attr('data-state', element_state);
    });
    
    $('.example .example-form-element').focus(function(){
        $(this).closest(".design-system-card").find('.state-selector label input').removeAttr('checked');
        $(this).closest(".design-system-card").find('.focus-label input').attr('checked','checked');
        $(this).closest(".example").attr('data-state', 'focus-state');
    });
    
        
    
    /*----------- COMPONENT EXAMPLE: Tables ----------- */
    $('tr td:first-of-type').on('click', function(){
        
        //toggle class to show / hide child <td>
        var parent = $( this ).parent().get( 0 );
        $(parent).children('td').toggleClass('showGroup');
        
        //toggle class on parent
        $(parent).toggleClass('groupParent');
        
    });
    
    
    /*----------- COMPONENT EXAMPLE: Accordions ----------- */
    
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
    
    
    
    /*----------- COMPONENT EXAMPLE: Media Player ----------- */
    $('.media-player-transcript-toggle button').on('click', function(){
        //$('.media-player-transcript').toggleClass('open');
        
        
        if ($('.media-player-transcript').hasClass('open')) {
            $('.media-player-transcript').removeClass('open');
            $('.media-player-transcript-toggle span').text('Open Transcript');
            $('.media-player .media-player-transcript-toggle .iconAnimateWrapper svg').removeClass('open');
        } else {
            $('.media-player-transcript').addClass('open');
            $('.media-player-transcript-toggle span').text('Close Transcript');
            $('.media-player .media-player-transcript-toggle .iconAnimateWrapper svg').addClass('open');
        }
    });
    
    
    
    
    /*----------- COMPONENT EXAMPLE: Pagination ----------- */
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
    

     /*----------- COMPONENT EXAMPLE: Anchor menu ----------- */
    $('.anchor-menu-example a').on('click', function(){
        console.log('clicked');
        $('.anchor-menu-example a').removeClass('active-sticky');
        $(this).addClass('active-sticky');
    });
    
    
    
    
    /*----------- SAB Navigation 2 functionality  ----------- */
    
    // Activate submenu functionality
    // https://stackoverflow.com/questions/44467377/bootstrap-4-multilevel-dropdown-inside-navigation
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $(this).next('.dropdown-menu');
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass('show');
    });

    return false;
    });
    
    $('#guide_navlink').hover(
        function(){
            $(this).addClass('open');
        },
        function(){
            $(this).removeClass('open');
        }                           
    );
    
    
    // Reset disabled links so they take the user to the required url (disabled so dropdown opens on hover rather than click)
    // NOTE: hover on dropdown is performed with CSS NOT javascript
    $('.dropdown-submenu').on('click', function(){
        $(this).children('a').css('text-decoration', 'underline');
        var href = $(this).children('a').attr('href');
        window.location = href;
    });
    
    
}); // END doc ready

