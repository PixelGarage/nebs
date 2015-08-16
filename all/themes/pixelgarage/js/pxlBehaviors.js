/**
 * This file contains all Drupal behaviours of the Apia theme.
 *
 * Created by ralph on 05.01.14.
 */

(function ($) {

    /**
     * This behavior adds shadow to header on scroll.
     *
     */
    Drupal.behaviors.addHeaderShadow = {
        attach: function (context) {
            $(window).on("scroll", function() {
                if ($(window).scrollTop() > 10) {
                    $("header.navbar .container").css( "box-shadow", "0 4px 3px -4px gray");
                } else {
                    $("header.navbar .container").css( "box-shadow", "none");
                }
            });
        }
    };

    Drupal.behaviors.flipCard = {
        attach: function() {
            var $cards = $('.view-europa .card');

            $cards.once('click', function() {
                $(this).on('click', function() {
                    $(this).toggleClass('flipped');
                });
            });
        }
    };

    Drupal.behaviors.filterMenus = {
        attach: function() {
            var $pageHeader = $('#page-header'),
                $secondaryMenu = $('header#navbar .menu.secondary'),
                $menus = $secondaryMenu.find('.menu-filter');

            $menus.once('click', function() {
                $(this).on('click', function() {
                    var $menu = $(this),
                        $menuIsActive = $menu.hasClass('active'),
                        $parliamentarianFilter = $('#edit-field-parliamentarian-value-wrapper'),
                        $cantonFilters = $('#edit-field-canton-tid-wrapper'),
                        $partyFilters = $('#edit-field-party-tid-wrapper');

                    // reset active menu
                    $menus.removeClass('active');

                    // menu specific
                    if ($menu.hasClass('filter-candidates')) {

                    } else if ($menu.hasClass('filter-swiss-canton')) {
                        $partyFilters.hide();
                        $cantonFilters.show();
                        if (!$menuIsActive) {
                            $menu.addClass('active')
                        } else {
                            $menu.removeClass('active')
                        }

                    } else if ($menu.hasClass('filter-party')) {
                        $cantonFilters.hide();
                        $partyFilters.show();
                        if (!$menuIsActive) {
                            $menu.addClass('active')
                        } else {
                            $menu.removeClass('active')
                        }

                    }

                    // show / hide filter section
                    if ($menus.hasClass('active')) {
                        $pageHeader.slideDown(300);
                    } else {
                        $pageHeader.slideUp(300);
                    }
                });
            });
        }
    };

    Drupal.behaviors.pxlCheckboxClick = {
        attach: function () {
            var $pxlCheckboxes = $('.pxl-checkbox');

            $pxlCheckboxes.once('click', function() {
                $(this).on('click', function() {
                    var $checkbox = $(this),
                        $input = $checkbox.find('input');

                    if ($input.prop('checked')) {
                        $checkbox.addClass('selected');
                    } else {
                        $checkbox.removeClass('selected');
                    }
                });
            });
        }
    };

    /**
     * Allows full size clickable items.
    Drupal.behaviors.fullSizeClickableItems = {
        attach: function () {
            var $clickableItems = $('.node-link-item.node-teaser .field-group-div')
                .add('.node-team-member.node-teaser .field-group-div');

            $clickableItems.once('click', function () {
                $clickableItems.on('click', function () {
                    window.location = $(this).find("a:first").attr("href");
                    return false;
                });
            });
        }
    };
     */

    /**
     * Swaps images from black/white to colored on mouse hover.
    Drupal.behaviors.hoverImageSwap = {
        attach: function () {
            $('.node-project.node-teaser .field-name-field-images a img').hover(
                function () {
                    // mouse enter
                    src = $(this).attr('src');
                    $(this).attr('src', src.replace('teaser_bw', 'teaser_normal'));
                },
                function () {
                    // mouse leave
                    src = $(this).attr('src');
                    $(this).attr('src', src.replace('teaser_normal', 'teaser_bw'));
                }
            );
        }
    }
     */

    /**
     * Open file links in its own tab. The file field doesn't implement this behaviour right away.
    Drupal.behaviors.openDocumentsInTab = {
        attach: function () {
            $(".field-name-field-documents").find(".field-item a").attr('target', '_blank');
        }
    }
     */



})(jQuery);