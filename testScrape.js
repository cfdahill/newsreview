const request = require("request");
const cheerio = require("cheerio");
//Am I the only one that mentally says "cheerio" in a British accent to myself?

request("https://www.sciencenews.org/", (error, response, html) => {
    if (error) throw error;

    const $ = cheerio.load(html);

    $("article.node-teaser").each((i, element) => {
        const ease = $(element)
            .find("h2.node-title")
            .children();

        let result = {};

        result.headline = ease.text().trim();
        result.url = ease.attr("href").trim();
        result.summary = $(element)
            .children("div.content")
            .text().trim();
        console.log(result);
    });
});