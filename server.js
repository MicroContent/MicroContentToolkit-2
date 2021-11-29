const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require("url");
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

var editor_plug_code = '';
var viewer_plug_code = '';
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "svg": "image/svg+xml",
    "json": "application/json",
    "js": "text/javascript",
    "css": "text/css"
};


//Only HTML without CSS and JS
const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('main/LiveEdit.html', function (error, data) { //main toolkit site
        if (error) {
            res.writeHead(404)
            res.write('Error: File not found')
        } else {
            res.write(data)
        }
        res.end()
    })
})

//Loading only HTML (toolkit without CSS and JS)
server.listen(8081, function (error) {
    if (error) {
        console.log('something went wrong', error);
    } else {
        console.log('Toolkit is running on port 8080');
    }
})


//toolkit (HTML + CSS + JS)
http.createServer(onRequest_a).listen(8080);
//Loading CSS and JS with HTML
function onRequest_a(req, response) {
    var uri = url.parse(req.url).pathname,
        filename = path.join(process.cwd(), uri);
    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
            return;
        }
        if (fs.statSync(filename).isDirectory())
            filename += 'main/LiveEdit.html'; //main toolkit site
        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.write(err + "\n");
                response.end();
                return;
            }
            var mimeType = mimeTypes[filename.split('.').pop()];
            if (!mimeType) {
                mimeType = 'text/plain';
            }
            response.writeHead(200, { "Content-Type": mimeType });
            response.write(file, "binary");
            response.end();
        });
    });
}




//Receiving editor-plugin-code
app.listen(9010, () => {
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:8080' }));

app.post("/", (req, res) => {
    var body = '';
    editor_plug_code = req.body.message;
    res.send({ "link": "http://localhost:9011" });
});

//loading editor-plugin for editor-iframe
http.createServer(function (req, res) {
    res.write(editor_plug_code);
    res.end();
}).listen(9011);




app.listen(9012, () => {
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:8080' }));

app.post("/", (req, res) => {
    var body = '';
    editor_plug_code = req.body.message;
    res.send({ "link": "http://localhost:9013" });
});


//loading viewer-plugin for viewer-iframe
http.createServer(function (req, res) {
    res.write(viewer_plug_code);
    res.end();
}).listen(9013);





