(function () {

    let connection = new signalR.HubConnection("http://localhost:64645/hitCounter")

    connection.on('Hit', data => {
        console.log(data);
        $('#counter').text(data)
    });

    connection.start()
        // .then(() => connection.invoke('recordHit', getMessage()));
        .then(function () {
            $('#button').click(function () {
                connection.invoke('recordHit', getMessage());
            });
        });

    function getMessage() {
        var text = $('#input').val();

        return text;
    }
})();