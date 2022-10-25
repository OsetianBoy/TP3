const http = require('http');
require('dotenv').config();

const server = http.createServer((_req, res) => {
    res.end('Arranco');
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server corriendo en ${PORT}`);
}); 