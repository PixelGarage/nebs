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

    /**
     * Toggles 'flipped' class on card click. Used for 3d-transformation.
     */
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

    /**
     * Implements the active state of the filter menus and opens or closes the filter section
     * according to the menu state.
     */
    Drupal.behaviors.activateFilterMenus = {
        attach: function() {
            var $exposedForm = $('header#navbar .navbar-exposed-form'),
                $secondaryMenu = $('header#navbar .menu.secondary'),
                $menus = $secondaryMenu.find('.menu-filter');

            $menus.once('activated', function() {
                $(this).on('click', function() {
                    var $menu = $(this),
                        $menuIsActive = $menu.hasClass('active'),
                        $cantonFilters = $('#edit-field-canton-tid-wrapper'),
                        $partyFilters = $('#edit-field-party-tid-wrapper');

                    // reset active menu
                    $menus.removeClass('active');

                    // menu specific
                    if ($menu.hasClass('filter-swiss-canton')) {
                        $partyFilters.hide();
                        $cantonFilters.show();
                        if (!$menuIsActive) {
                            $menu.addClass('active');
                        } else {
                            $menu.removeClass('active');
                        }

                    } else if ($menu.hasClass('filter-party')) {
                        $cantonFilters.hide();
                        $partyFilters.show();
                        if (!$menuIsActive) {
                            $menu.addClass('active');
                        } else {
                            $menu.removeClass('active');
                        }

                    }

                    // show / hide filter section
                    if ($menus.hasClass('active')) {
                        $exposedForm.slideDown(300);
                    } else {
                        $exposedForm.slideUp(300);
                    }
                });
            });
        }
    };

    /**
     * Implements the checkbox state for all checkboxes and updates the corresponding menu checked state.
     */
    Drupal.behaviors.pxlCheckboxClick = {
        attach: function () {
            var $cantonCheckboxes = $('#edit-field-canton-tid-wrapper .pxl-checkbox'),
                $partyCheckboxes = $('#edit-field-party-tid-wrapper .pxl-checkbox'),
                $parliamentarianMenu = $('header#navbar .secondary .filter-candidates'),
                $cantonMenu = $('header#navbar .secondary .filter-swiss-canton'),
                $partyMenu = $('header#navbar .secondary .filter-party'),
                strQuery = window.location.search;

            // initialize filter menus
            if (strQuery.indexOf('field_parliamentarian_value=1') > 0) {
                $parliamentarianMenu.addClass('checked');
            }
            if (strQuery.indexOf('field_canton_tid') > 0) {
                $cantonMenu.addClass('checked');
            }
            if (strQuery.indexOf('field_party_tid') > 0) {
                $partyMenu.addClass('checked');
            }

            // candidates flag
            $parliamentarianMenu.once('checked', function() {
                $(this).on('click', function() {
                    var $input = $('#edit-field-parliamentarian-value-wrapper input'),
                        $menu = $(this),
                        $submit = $('#edit-submit-europa');

                    if (!$menu.hasClass('checked')) {
                        $input.attr('value', '1');
                        $menu.addClass('checked');
                    } else {
                        $input.attr('value', 'All');
                        $menu.removeClass('checked');
                    }
                    // submit filter
                    $submit.click();
                });
            });

            // canton / party checkboxes
            $cantonCheckboxes.once('checked', function() {
                $(this).on('click', function() {
                    var $checkbox = $(this),
                        $input = $checkbox.find('input');

                    if ($input.prop('checked')) {
                        $checkbox.addClass('selected');
                        $cantonMenu.addClass('checked');

                    } else {
                        $checkbox.removeClass('selected');
                        if (!$cantonCheckboxes.hasClass('selected')) {
                            $cantonMenu.removeClass('checked');
                        }
                    }
                });
            });
            $partyCheckboxes.once('checked', function() {
                $(this).on('click', function() {
                    var $checkbox = $(this),
                        $input = $checkbox.find('input');

                    if ($input.prop('checked')) {
                        $checkbox.addClass('selected');
                        $partyMenu.addClass('checked');

                    } else {
                        $checkbox.removeClass('selected');
                        if (!$partyCheckboxes.hasClass('selected')) {
                            $partyMenu.removeClass('checked');
                        }
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