const { WebSocketServer } = require('ws');
const url = require('url');

const wss = new WebSocketServer({ port: 9900 });

const userConnections = Map();

// Handle User Connections and Add them to the Map (THERE MUST BE A USERNAME PASSED AS A HEADER)
wss.on('connection', (ws, req) => {

    const queryParams = url.parse(req.url, true).query;
    const userName = queryParams['username']; // Accessing the 'username' query parameter

    if (!userName) {
        console.error('Username not provided in the WebSocket URL.');
        return ws.close();
    }

    const connections = userConnections.get(userName) || [];
    connections.push(ws);
    userConnections.set(userName, connections);

    ws.on('close', () => {
        // Remove closed WebSocket connection from the array of connections
        const connections = userConnections.get(userName) || [];
        const index = connections.indexOf(ws);
        if (index !== -1) {
            connections.splice(index, 1);
            if (connections.length === 0) {
                // If there are no more connections for this user, remove the entry from the map
                userConnections.delete(userName);
            } else {
                userConnections.set(userName, connections);
            }
        }
    });
});

// Function for telling users (each live connection of a single user) that someone added them as a friend
function alertFriends(userName) {
    const connections = userConnections.get(userName) || [];
    connections.forEach(ws => {
        message = 'fill this in later';
        ws.send(message);
    });
}


module.exports = {
    alertFriends
}