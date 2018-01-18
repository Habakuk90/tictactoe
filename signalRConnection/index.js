let connection = new signalR.HubConnection("http://localhost:64645/chat")
debugger;

connection.on('send', data => {
    console.log(data);
});

connection.start()
    .then(() => connection.invoke('send', 'Hello'));