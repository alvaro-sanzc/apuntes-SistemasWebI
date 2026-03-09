const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

const port = 3000;
const options = {
    hostname: 'www.amazon.es',
    port: 443,
    path: '/',
    method: 'GET'
};

let prices = '';

// Precios productos de amazon en un intervalo de tiempo
setInterval(() => {
    const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('end', () => {
            const $ = cheerio.load(data);
            $('span.a-offscreen').each((i, element) => {
                prices += $(element).text() + '\n';
                console.log(prices);
                console.log("----------------");
            });
        });
    });
    req.on('error', error => {console.error(error);})
    req.end();
}, 1000);

// Servidor
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(prices);
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

