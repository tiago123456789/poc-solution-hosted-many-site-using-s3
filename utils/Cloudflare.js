const axios = require('axios');

module.exports = {

    createNewCname(prefix) {
        return axios.post(
            `${process.env.CLOUDFLARE_API_URL}zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`,
            {
                type: "CNAME",
                name: prefix,
                content: `${prefix}${process.env.S3_URL_SUFFIX}`
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        ).then(response => response.data.result)
    }
}