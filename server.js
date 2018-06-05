//establish connection
//can put routes here, should move into actual routes/controllers folder if time permits

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
//Am I the only one that mentally says "cheerio" in a British accent to myself?

var db = require("./models");

var PORT = 2000;

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newsreview");

//"Scrape it up, scrape it up" - Weird Al Yankovic (hopefully)
app.get("/scrape", function(req, res) {
    request("https://www.sciencenews.org/#", function(error, response, html) {
        if (error) throw error;

        var $ = cheerio.load(html);
        var results = [];

        $("article.node-teaser").each(function(i, element) {
            var ease= $(element).find("h2.node-title").children();
           
            var headline = ease.text();
            var url = ease.attr("href");
            var summary = $(element).children("div.content").text();
        
            results.push({
                headline: headline,
                url: url,
                summary: summary
            });
        });
        console.log(results)
    })
})