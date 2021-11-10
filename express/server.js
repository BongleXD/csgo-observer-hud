express = require('express');
http = require('http');
cors = require('cors');

const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ limit: '100Mb', type: 'application/json' }));
app.use(cors({ 
    origin: '*', 
    credentials: true 
}));

app.post('/', (req, res) => {
    const text = req.body.toString().replace(/"(player|owner)":([ ]*)([0-9]+)/gm, '"$1": "$3"').replace(/(player|owner):([ ]*)([0-9]+)/gm, '"$1": "$3"');
    const data = JSON.parse(text);
    io.emit("update", data);
    res.sendStatus(200);
});

server.listen(3000);
