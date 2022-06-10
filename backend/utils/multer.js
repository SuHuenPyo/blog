const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const throwError = require('./errorHandler');

aws.config.loadFromPath(__dirname + '/../configs/s3.json');

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'miary',
        acl: 'public-read',
        key: function(req,file,cd){
            if(!file || file == null){
                return;
            }

            cd(null,Date.now() + '.' + file.originalname.split('.').pop())
        }
    })
})

const deleteImg = (filename)=>{
    s3.deleteObject({
        Bucket : 'miary',
        Key: filename
      }, function(err, data){
          if(err){
             throwError('[S3 Detelete Object]',err);
          }

          return;
      });
}


module.exports = {upload, deleteImg};