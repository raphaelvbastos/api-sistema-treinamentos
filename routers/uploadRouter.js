var express = require('express');
var uploadRouter = express('Router');

const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({ uploadDir: './arquivos' });

uploadRouter.post('/teste', multipartMiddleware, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.json({
        'message': 'File uploaded successfully'
    });
});

uploadRouter.post('/', multipartMiddleware, (req, res) => {


    // var formidable = require('formidable');
    var fs = require('fs');
    var mv = require('mv');
    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //     var oldpath = files.filetoupload.path;
    //     var newpath = './arquivos/' + files.filetoupload.name;

    //     mv(oldpath, newpath, function (err) {
    //         if (err) throw console.log(err);
    //         res.json({
    //             'message': 'File uploaded successfully'
    //         });
    //     });
    // });

    // console.log(req.files);
    // console.log(req.files.uploads[0].path);
    // console.log(req.files.uploads[0].name);

    var tmp_path = req.files.upload.path;
    var target_path = 'arquivos/' + req.files.upload.name;
    mv(tmp_path, target_path, function (err) {
        if (err) throw console.log(err);
        res.json({
            'message': 'File uploaded successfully'
        });
    });

    // fs.rename(tmp_path, target_path, function(err) {
    //     if (err) throw err;
    //     fs.unlink(tmp_path, function() {
    //         if (err) throw err;
    //         res.send('File uploaded to: ' + target_path);
    //     });
    // });



    // res.json({
    //     'message': 'File uploaded successfully'
    // });
});

module.exports = uploadRouter;
