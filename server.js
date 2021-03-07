const { ENFILE } = require('constants')

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
            // Authentification
            case "/auth":
                end("/ressources/auth/index.html", res)
                break;
            case "/disconnect":
                end("/ressources/auth/disconnect.html", res)
                break;
            case "/profile":
                end("/ressources/auth/profile.html")
                break;

            // Code / IDE
            case "/ide":
                end("/ressources/ide/index.html", res)
                break;
            case "/share":
                end("/ressources/ide/share.html", res)
                break;
            
            case "/settings" :
                end("/ressources/settings.html", res)
                break;

            case "/":
                end("/ressources/index.html", res)
                break;

                
            default:
                end(req.url, res)
                
                // res.writeHead(404)
                // res.end(`Error 404: http://${host}:${port}${req.url} was not found.`)
            
            case "/favicon.ico":
                end('/public/favicon.ico', res)
        }
    }
    
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port} \n\n`)
    })

    // function route(name) {}
}
catch {
    if (err) throw err
}