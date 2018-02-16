(function ($) {
    // [TODO] localhost ersetzen
    let connection = new signalR.HubConnection("/game/") // "hitCounter" name des Hubs "HitCounterHub"; MapRoute UseSignalR Startup.cs


    connection.on('setPlay', function (tileId) {
        console.log(tileId);
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
            $('.box__inner').on('click touchstart', function () {
                var that = this;
                var url = new URL(location.href);

                var enemyName = url.searchParams.get(enemyName);
                connection.invoke('SetPlayTicTacToe', that.id, enemyName); // recordHit invoke vom Client an Server Funktion; parameter kommen in der server Methode an 
            });

            $('.button.button-start').on('click', function (e, a) {
                var enemyName = $('.enemy-list__item.selected').text();
                var link = $('.game-linkfield.selected').data('link');
                var pathname = link + '?enemyName=' + enemyName
                location.href = location.origin + pathname;
            });
        });

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