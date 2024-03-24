const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 9900 });

const userConnections = Map();

// Handle User Connections and Add them to the Map (THERE MUST BE A USERNAME PASSED AS A HEADER)
wss.on('connection', (ws, req) => {
    const userName = req.headers['userName']; // Assuming you're passing user ID in headers
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
function alertFriends() {
    const connections = userConnections.get(userName) || [];
    connections.forEach(ws => {
        ws.send(message);
    });
}


module.exports = {
    alertFriends
}