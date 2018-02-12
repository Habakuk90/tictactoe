(function($) {
    function initEvents() {
        gamesEvents();
        navigationEvents();
    }

    var navigationEvents = function () {
        $('.nav-list__item, .nav-list__item--user').on('click', function(e,a) {
            $that = $(this);
            location.pathname = $that.data('link');
        });
    }

    var gameLink;
    var gamesEvents = function () {
        $('.game-linkfield').on('click', function (e, a) {
            $that = $(this);
            gameLink = $that.data('link');

            $that.addClass("selected");
        });
    }


    initEvents();
})(jQuery);