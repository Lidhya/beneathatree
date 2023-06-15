const express = require('express');
const AWS = require('aws-sdk');
const app = express();
require('dotenv').config();
const {CLOUDFRONT_DOMAIN, ACCESS_KEY_ID, SECRET_ACCESS_KEY, IMAGE_FILE_KEY, CLOUDFRONT_PRIVATE_KEY, CLOUDFRONT_KEY_PAIR_ID, AWS_REGION}=process.env

AWS.config.update({
  accessKeyId:ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

// Instance of the AWS CloudFront signer
const signer = new AWS.CloudFront.Signer(CLOUDFRONT_KEY_PAIR_ID, CLOUDFRONT_PRIVATE_KEY);

app.get('/', (req, res) => {
  const signedUrl = signer.getSignedUrl({
    url: `${CLOUDFRONT_DOMAIN}/${IMAGE_FILE_KEY}`, 
    expires: Math.floor((Date.now() + 5 * 60 * 1000) / 1000),
  });

  console.log('Signed URL:', signedUrl);

  res.send('Signed URL generated. Check the console for the signed URL.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
