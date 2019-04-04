const http = require ('http')

http.createServer ((req, res) => {

    if (req.url == '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.write("<h1>Accueil\n</h1>")
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.write("<span style='color: red'>Erreur 404</span>")
    }
 
    res.end()
}).listen(8080)