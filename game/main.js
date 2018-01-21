(function () {

    let connection = new signalR.HubConnection("http://localhost:64644/hitCounter")

    connection.on('Hit', function (color,id) {
        console.log(color);
        // $('#counter').text(data);
        setRandomColor(color, id);

    });

    connection.start()
        // .then(() => connection.invoke('recordHit', getMessage()));
        .then(function () {
            $('.box__inner').click(function () {
                var that = this;
                connection.invoke('recordHit', randomColor(), that.id);
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
        $('#'+id).css('background-color', color);
    }
})();