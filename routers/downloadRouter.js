var express = require('express');
var downloadRouter = express('Router');

downloadRouter.get('/:uid', function (req, res) {
    const file = './arquivos/' + req.params.uid;
    res.download(file); // Set disposition and send it.
});

module.exports = downloadRouter;
