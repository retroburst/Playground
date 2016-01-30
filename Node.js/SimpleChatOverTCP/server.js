// requires
var net = require('net');
var moment = require('moment');

// vars
var server = net.createServer();
var clients = [];
var port = 9000;

// set the callbacks for various server events
// on server connection event
server.on('connection',
          function(client)
          {
            client.name = client.remoteAddress + ":" + client.remotePort;
            client.write("Welcome to the SimpleChatOverTCP! You are client [" + client.name + "].\n");
            clients.push(client);

            broadcastJoinMessage(client);

            // on client data received event
            client.on('data', function(data){
                        var message = data.toString().trim();
                        if(!isChatDataEmpty(message))
                        {
                            if(message === "exit")
                            {
                                exitClient(client);
                            }
                            else
                            {
                                broadcastChat(message, client);
                            }
                        }
                    });
          
            // on client socket ended event
            client.on('end', function(){
                        log("Removing client [" + client.name + "] because socket was closed.");
                        clients.splice(clients.indexOf(client), 1);
                    });
          
            // on client error event
            client.on('error', function(e){
                        log("Error for client [" + client.name + "]: " + e.name + " -- " + e.message);
                    });
          
          });

// on server error event
server.on('error', function(e){
            log("Error for server: " + e.name + " -- " + e.message);
          });

///////////////////////////////////////////////////////
// broadcasts a message to all clients except originating
function broadcast(message, client)
{
    var invalidClients = [];
    // add a newline if not already there
    if(message.slice(-1) != '\n') message += '\n';
    log(message);
    for(var i=0; i < clients.length; i++)
    {
        if(clients[i] === client) { continue; }
        // check that the client socket is still writable
        if(client.writable)
        {
            clients[i].write(message);
        }
        else
        {
            invalidClients.push(clients[i]);
            clients[i].destroy();
        }
    }
    // remove and invalid clients found during the broadcast
    for(i=0; i < invalidClients.length; i++)
    {
        clients.splice(clients.indexOf(invalidClients[i], 1));
    }
}

///////////////////////////////////////////////////////
// builds a chat message from data and broadcasts it
// to all clients except originating
function broadcastChat(message, client){
    var builtMessage = getTimeStamp() + " [" + client.name + "] says: " + message;
    broadcast(builtMessage, client);
}

///////////////////////////////////////////////////////
// builds a chat message from data and broadcasts it
// to all clients except originating
function broadcastJoinMessage(client)
{
    broadcast("[" + client.name + "] joined the chat @ " + getTimeStamp() + ".", client);
}

///////////////////////////////////////////////////////
// gets a timestamp for logging
function getTimeStamp()
{
    return(moment().format("YYYY-MM-DD hh:mm:ss"));
}

///////////////////////////////////////////////////////
// logs a message
function log(message)
{
    console.log("SimpleChatOverTCP [" + getTimeStamp() + "] : " + message);
}

///////////////////////////////////////////////////////
// exits a client from the chat.
function exitClient(client)
{
    broadcast("[" + client.name + "] left the chat @ " + getTimeStamp() + ".", client);
    client.end();
}

///////////////////////////////////////////////////////
// checks if the chat data is empty or null
function isChatDataEmpty(target)
{
    if (!target || target.length == 0) {
        return true;
    }
    return !/[^\s]+/.test(target);
}

// start the server on specified port
server.listen(port);
log("SimpleChatOverTCP server listening on port " + port);

