const templateEngine = require("ejs")

module.exports = {

    generateHtmlWithDynamicData(file, data) {
        return templateEngine.renderFile(file, data)
    }
}