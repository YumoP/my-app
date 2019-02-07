const express = require('express');
const router = express.Router();
const Data = require('../models/data');
const Datas = require('../Controller/data');

router.get('', function(req, res){
    Data.find({}, function(err, data){
        res.json(data);
    });
});
router.post('/postdata', Datas.postdata);
router.put('/update', Datas.update);
module.exports = router;