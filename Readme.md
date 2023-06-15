# CloudFront Signed URL Generator

This is a simple Express.js application that generates a signed URL for a file stored in an S3 bucket and served through CloudFront. The signed URL has an expiry time of 5 minutes.

## Prerequisites

Before running the application, make sure you have the following environment variables set in a `.env` file:

- `CLOUDFRONT_DOMAIN`: The CloudFront domain name where the file is served from.
- `ACCESS_KEY_ID`: The AWS access key ID with permissions to generate signed URLs.
- `SECRET_ACCESS_KEY`: The AWS secret access key corresponding to the access key ID.
- `IMAGE_FILE_KEY`: The key of the file in the S3 bucket.
- `CLOUDFRONT_PRIVATE_KEY`: The private key associated with the CloudFront key pair used for signing.
- `CLOUDFRONT_KEY_PAIR_ID`: The ID of the CloudFront key pair used for signing.
- `AWS_REGION`: The AWS region where the S3 bucket and CloudFront distribution are located.

## Installation

1. Clone this repository and navigate to the project directory.

2. Install the dependencies by running the following command: `npm install`

3. Create a `.env` file in the project directory and set the required environment variables as described in the Prerequisites section.

## Usage

1. Start the application by running the following command: `node index.js`

2. Access the application in your browser at `http://localhost:3000`.

3. On the home page, click the "Click Me" button to be redirected to the signed URL page.

4. The signed URL will be generated and displayed on the console. You can also click the provided link to directly access the file.

## Note

The signed URL is set to expire after 5 minutes. After expiration, attempting to access the URL will result in an access denied error.

