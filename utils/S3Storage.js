const AWS = require("aws-sdk")

const { default: axios } = require("axios");

AWS.config.update({ region: process.env.S3_REGION });

const s3 = new AWS.S3({
    region: process.env.S3_REGION
});

module.exports = {

    createBucket(bucketName) {
        return s3.createBucket({ Bucket: bucketName }).promise()
    },

    enableStaticHostWebsiteInBucket(bucketName) {
        var staticHostParams = {
            Bucket: bucketName,
            WebsiteConfiguration: {
                ErrorDocument: {
                    Key: 'index.html'
                },
                IndexDocument: {
                    Suffix: 'index.html'
                },
            }
        };

        return s3.putBucketWebsite(staticHostParams).promise()
    },

    uploadFile(content, key, bucketName) {
        const params = {
            Bucket: bucketName,
            Key: key,
            ACL: "public-read",
            Body: content,
            ContentType: "text/html",
        };

        return s3.putObject(params).promise()
    }
}