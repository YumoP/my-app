const Data = require('../models/data');
const {normalizeErrors} = require("../helpers/errorHelper");

exports.postdata = function(req, res){
    const {costcode, name} = req.body;
    if(!costcode || !name){
        return res.status(422).send({errors:[{title:"Post Error", detail:"cannot be empty"}]});
    }
    const data = new Data({
        costcode: costcode,
        name:name
    });
    data.save(function(err){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)}); 
        }
        return res.json({"post": true});
    });
}
exports.update = function(req, res){
    const {_id, costcode, name} = req.body;
    if(!_id){
        return res.status(422).send({errors:[{title:"Put Error", detail:"_id cannot be empty"}]});
    }
    Data.findById(_id, function(err, data){
        data.set({costcode:costcode, name:name});
        data.save(function(err, updatedData){
            res.send(updatedData);
        });
    });
}