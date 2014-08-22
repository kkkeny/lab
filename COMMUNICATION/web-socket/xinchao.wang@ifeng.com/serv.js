var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response){
	// process HTTP request. Since we're writeing just WebSockets server
})
server.listen(8181,function(){

})

wsServer = new WebSocketServer({
	httpServer: server
})

wsServer.on('request',function(request){
	var connection = request.accept(null, request.origin);

	connection.on('message', function(message){
		if (message.type === 'utf8'){
			connection.sendUTF(message.utf8Data);
		}
	})

	connection.on('close', function(connection){
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	})
})