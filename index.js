const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');  // Correct import

const app = {};

app.config = {
    port: 3000
};

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`The app is running on port ${app.config.port}`);
    });
}; 
 

app.handleReqRes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toLowerCase();
    const decoder = new StringDecoder('utf-8');  // Correct usage of StringDecoder
    let realData = '';

    req.on('data', (buffer) => {  // It should be req.on, not res.on
        realData += decoder.write(buffer);
        console.log('hi saif my son');
        console.log(realData);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end('Stoping req data');
    });
};

app.createServer();
