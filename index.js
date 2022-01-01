require("dotenv").config();

const templateEngine = require("./utils/TemplateEngine");
const s3Storage = require("./utils/S3Storage");
const cloudflare = require("./utils/Cloudflare");

(async () => {
    const site = await templateEngine.generateHtmlWithDynamicData("./views/index.ejs", {
        title: "Site of Mary",
        brandName: "johnmary test",
        section: {
            title: "Site johnmary",
            text: "Download, edit the text, and add your own fullscreen background photo to make it your own.        ",
            button: {
                link: "https://www.linkedin.com/feed/",
                text: "More here"
            }
        }
    });

    const bucketName = `johnmary${process.env.S3_BUCKET_SUFFIX}`
    await s3Storage.createBucket(bucketName);
    await s3Storage.enableStaticHostWebsiteInBucket(bucketName);
    await s3Storage.uploadFile(Buffer.from(site, "utf-8"), "index.html", bucketName)

    console.log("URL ACCESS S3 SITE =>>> ", `johnmary${process.env.S3_URL_SUFFIX}`)
    try {
        const response = await cloudflare.createNewCname("johnmary")
        console.log(response.name)
    } catch(error) {
        console.log(error.message)
        console.log("Cloudflare already setting.")
    }
    
})()