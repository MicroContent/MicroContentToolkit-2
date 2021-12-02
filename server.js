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


//The whole function is being used to load only HTML without CSS and JS (toolkit without CSS and JS)
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

//The server is listening on port 8081 to execute the above function
server.listen(8081, function (error) {
    if (error) {
        console.log('something went wrong', error);
    } else {
        console.log('Toolkit is running on port 8080');
    }
})

//The whole function is being used to load also CSS and JS (HTML + CSS + JS))
//The server is listening on port 8080
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


////////////////////////////////////////////////////////////////////////////////////////////
/*                  Important functions to change or add starts here!                    */
////////////////////////////////////////////////////////////////////////////////////////////


//Server is listening on port 9010 now
//to receive the editor code from the 1st CodeMirror frame
app.listen(9010, () => {
});

//The content which came from a port (from client) should be understood by the app
//And the app is capable of understanding the following types of content adn to use special functions to receive the content:
//JSON
app.use(bodyParser.json());
//URL
app.use(bodyParser.urlencoded({ extended: false }));
//CORS (Cross-Origin Resource Sharing)
app.use(cors({ origin: 'http://localhost:8080' }));

//The URL with the port 9010 is only accessable through a POST-request by the client
app.post("/", (req, res) => {
    
    var body = '';
    
    //Gets the content (editor-code) directly from the sent request (which is a JSON)
    editor_plug_code = req.body.message;
    
    //Send the the new URL with different port to the client
    res.send({ "link": "http://localhost:9011" });
    
});

//Server is listening on port 9011 now
http.createServer(function (req, res) {
    
    //The previously temporarily stored editor-code is being written on the site with URL+port(9011) and sent directly to the client back
    //(Sending it for the iframe)
    res.write(editor_plug_code);
    
    //Response is complete (the response is ready to be sent)
    res.end();

}).listen(9011);






//Listening on Port 9012 
//to receive the viewer code from the 2nd CodeMirror frame
app.listen(9012, () => {
});

//The content which came from a port (from client) should be understood by the app
//And the app is capable of understanding the following types of content adn to use special functions to receive the content:
//JSON
app.use(bodyParser.json());
//URL
app.use(bodyParser.urlencoded({ extended: false }));
//CORS (Cross-Origin Resource Sharing)
app.use(cors({ origin: 'http://localhost:8080' }));

//The URL with the port 9013 is only accessable through a POST-request by the client
app.post("/", (req, res) => {
    
    var body = '';
    
    //Gets the content (viewer-code) directly from the sent request (which is a JSON)
    editor_plug_code = req.body.message;
    
    //Send the the new URL with different port to the client
    res.send({ "link": "http://localhost:9013" });
});


//Server is listening on port 9013 now
http.createServer(function (req, res) {
    
    //The previously temporarily stored editor-code is being written on the site with URL+port(9013) and sent directly to the client back
    //(Sending it for the iframe)
    res.write(viewer_plug_code);
    
    //Response is complete (the response is ready to be sent)
    res.end();
    
}).listen(9013);





