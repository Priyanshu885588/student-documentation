require("dotenv").config();
const {S3Client,GetObjectCommand,PutObjectCommand} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECERET_KEY_ID
    }
}) 

// const getObjectUrl = async (key)=>{
//     const command = new GetObjectCommand({
//         Bucket:"studentdocumentsrnsit",
//         Key:key
//     });
//     const url = getSignedUrl(s3Client,command);
//     return url;
// }

const putObject = async (filename,contentType)=>{
    const command = new PutObjectCommand({
        Bucket:"studentdocumentsrnsit",
        Key:`2021/Mandani/${filename}`,
        ContentType:contentType, 
    });
    const url = await getSignedUrl(s3Client,command);
    return url;
}

const temp = async (req,res)=>{
    try {
       console.log(process.env.JWT_SECRET);
      const url =  await putObject("DateOfBirth.jpeg","image/jpeg");
      console.log(url);
       res.json({url:url});
   } catch (error) {
     res.json(error);
   }
}

module.exports = {temp};