const express = require("express");
const AWS = require("aws-sdk");
const app = express();
require("dotenv").config();
const {
  CLOUDFRONT_DOMAIN,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  IMAGE_FILE_KEY,
  CLOUDFRONT_PRIVATE_KEY,
  CLOUDFRONT_KEY_PAIR_ID,
  AWS_REGION,
} = process.env;

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

// Instance of the AWS CloudFront signer
const signer = new AWS.CloudFront.Signer(
  CLOUDFRONT_KEY_PAIR_ID,
  CLOUDFRONT_PRIVATE_KEY
);

app.get("/", (req, res) => {
  res.send(
    `<div style="text-align:center; width:100%;"><h3>Hi there! <button onclick="redirectToSignedUrl()">Click Me</button>
    </h3></div> <script>
    function redirectToSignedUrl() {
      window.location.href = '/signed-url';
    }
  </script>`
  );
});

app.get("/signed-url", (req, res) => {
  const expiryTimestamp = Math.floor((Date.now() + 5 * 60 * 1000) / 1000);
  const signedUrl = signer.getSignedUrl({
    url: `${CLOUDFRONT_DOMAIN}/${IMAGE_FILE_KEY}`,
    expires: expiryTimestamp,
    // keyGroupIds: "ac3be8aa-7e23-4aa0-8fbc-33c87635dee0",
  });
  console.log("Signed URL:", signedUrl);
  res.send(
    `<div style="text-align:center; width:100%;"><h3>Signed URL generated. Check the console for the signed URL.</h3> <a href=${signedUrl}>Or click here</a> Will expire after 5 minutes</div>`
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
