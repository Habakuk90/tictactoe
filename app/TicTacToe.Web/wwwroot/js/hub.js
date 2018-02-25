(function ($) {
    // legeacy
    function openModal(message) {
        var $challengeContainer = $('.challenge');
        var $mainContainer = $('#main');
        $mainContainer.addClass('faded');
        $challengeContainer.addClass('active');
        $challengeContainer.find('.challenge__header').text(message);
    }

})(jQuery);