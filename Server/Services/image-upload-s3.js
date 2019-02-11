const config = require('../config/dev')
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region:'us-east-2'
})
var s3 = new aws.S3();
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    // if(file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new Error('Invalid file type'), false);
    }
}
var upload = multer({fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'itlizetest2',
    acl: 'public-read',
    //?
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META'});
    },
    //timestamp
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
})

module.exports = upload;