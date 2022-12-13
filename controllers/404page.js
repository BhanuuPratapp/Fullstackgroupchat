const path = require('path')
const rootDir = require('../util/path')
    exports.get404Page = (req, res, next) =>{
        //res.status(404).send('<h1>Page not found</h1>')
        res.status(404).sendFile(path.join(rootDir,'views','404.html'))
    }