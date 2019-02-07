const express = require('express');
const router = express.Router();

const upload = require('../Services/image-upload-s3');
const singleUpload = upload.single('image');

router.post('', function(req, res){
    singleUpload(req, res, (err)=>{
        if(err){
            return res.status(422).send({errors: [{title: '', detail:err.message}]});
        }
        return res.json({'imageUrl': req.file.location})
    })
});
module.exports = router;