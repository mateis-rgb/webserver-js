try {
    const http = require('http')    
    const fs = require('fs').promises
    
    const host = "localhost"
    const port = 8080
    
    function end(path, res) {
        var route = fs.readFile(__dirname + path)
            .then(contents => {
                res.setHeader("Content-Type", "text/html")
                res.writeHead(200)
                res.end(contents)
            })
            .catch(err => {
                res.writeHead(404)
                res.end(err)
                return
            })

        return route
    }

    const requestListener = function (req, res) {
        switch(req.url) {
            case "/":
                end("/index.html", res)
                break;

            default:
                end(req.url, res)
        }
    }
    
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port} \n\n`)
    })
}
catch (err) {
    if (err) throw err
}
