(function () {

    let connection = new signalR.HubConnection("https://localhost:44312/hitCounter") // "hitCounter" name des Hubs "HitCounterHub"

    connection.on('Hit', function (color,id) { // "Hit" invoke vom Server
        console.log(color);                     // DoStuff() color, id Parameter werden vom Server invoked
        setRandomColor(color, id);
    });

    connection.start()
        .then(function () {
            $('.box__inner').on('click touchstart', function () {
                var that = this;
                connection.invoke('recordHit', randomColor(), that.id); // recordHit invoke vom Client an Server Funktion; parameter kommen in der server Methode an 
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
