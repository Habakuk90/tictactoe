(function($) {
    var navigationEvents = function() {
        $('.nav-list__item, .nav-list__item--user').on('click', function(e,a) {
            location.pathname = $(this).data('link');
        });
    }

    navigationEvents();
})(jQuery);