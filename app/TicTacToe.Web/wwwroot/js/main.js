(function($) {
    function initEvents() {
        gamesEvents();
        navigationEvents();
        closeModal();
    }

    var navigationEvents = function () {
        $('.nav-list__item, .nav-list__item--user').on('click', function(e,a) {
            $that = $(this);
            location.pathname = $that.data('link');
        });
    }

    var closeModal = function () {
        $('.challenge__close-button').on('click', function () {
            $that = $(this);
            $('section.challenge.active').removeClass('active');

            $('#main').removeClass('faded');
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