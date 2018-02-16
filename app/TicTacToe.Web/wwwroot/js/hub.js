(function ($) {
    // [TODO] localhost ersetzen
    let connection = new signalR.HubConnection("/game/") // "hitCounter" name des Hubs "HitCounterHub"; MapRoute UseSignalR Startup.cs


    connection.on('setPlay', function (tileId) {
        console.log(tileId);
    });

    connection.on('challenge', function (message) {
        openModal(message);
    });

    connection.on('SetConnectedUser', (user) => {
        $('.enemy-list__container').empty();

        var listUser = '';
        $.each(user, function (index, value) {
            listUser += '<li class="enemy-list__item">' + value + '</li>'
        });

        $('.enemy-list__container').append(listUser);
        $('.enemy-list__item').on('click', function () {

            $('.enemy-list__item.selected').removeClass('selected');
            $(this).addClass("selected");
        });
    });

    connection.start()
        .then(function () {
            connection.invoke('GetConnectedUser')
            
            $('.button.button-start').on('click', function (e, a) {
                var enemyName = $('.enemy-list__item.selected').text();
                var gameLink = $('.game-linkfield.selected').data('link');
                
                //location.href = location.origin + gameLink;
                connection.invoke("SetMatchup", enemyName);
            });
        });

    function openModal(message) {
        var $challengeContainer = $('.challenge');
        var $mainContainer = $('#main');
        $mainContainer.addClass('faded');
        $challengeContainer.addClass('active');
        $challengeContainer.find('.challenge__header').text(message);
    }

    function getMessage() {
        var text = $('#input').val();
        return text;
    }

    function randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    function setRandomColor(color, id) {
        $('#' + id).css('background-color', color);
    }
})(jQuery);