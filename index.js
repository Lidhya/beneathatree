const express = require('express');
const AWS = require('aws-sdk');
const {getSignedUrl}= require('@aws-sdk/cloudfront-signer')

const app = express();
const port = 3000;

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const cloudFront = new AWS.CloudFront();

app.get('/', (req, res) => {
  const params = {
    url: `https://${process.env.CLOUDFRONT_DOMAIN}/${process.env.IMAGE_FILE_KEY}`,
    expires: Math.floor((Date.now() + 300000) / 1000), // Expiry time in seconds (5 minutes)
  };

  cloudFront.getSignedUrl(params, (err, url) => {
    if (err) {
      console.error('Error generating signed URL:', err);
      res.status(500).send('Error generating signed URL');
    } else {
      console.log('Signed URL:', url);
      res.send('Signed URL generated. Check the console for the URL.');
    }
  });
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});