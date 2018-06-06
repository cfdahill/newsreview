//establish connection
//can put routes here, should move into actual routes/controllers folder if time permits

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");
//Am I the only one that mentally says "cheerio" in a British accent to myself?

const db = require("./models");

var PORT = 2000;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newsreview");

//"Scrape, scrape it up, scrape it up" - Weird Al Yankovic (hopefully)
app.get("/scrape", (req, res) => {
    request("https://www.sciencenews.org/#", (error, response, html) => {
        if (error) throw error;

        const $ = cheerio.load(html);

        $("article.node-teaser").each((i, element) => {
            const ease = $(this)
                .find("h2.node-title")
                .children();

            let result = {};

            result.headline = ease.text();
            result.url = ease.attr("href");
            result.summary = $(this)
                .children("div.content")
                .text();

            //This should insert new articles without actually replacing old ones.  Will update old articles but that should still save the notes
            db.Article.save({result}, (error, data) => {
                if (error) throw error;
                res.send(data);
            });
        });
    });
});

//gets articles from the db
app.get("/articles", (req, res) => {
    db.Article.find({}, (error, data) => {
        if (error) throw error;
        res.json(data);
    });
});

//get one article
app.get("/articles/:id", (req, res) => {
    db.Article.find({
            _id: req.params.id
        })
        .populate("note")
        .then(data => res.json(data))
        .catch(error => res.json(error));
});

//add notes to an article
app.post("/articles/:id", (req, res) => {
    db.Notes.create(req.body)
        .then(data => {
            db.Article.fidOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbArticle._id
            }, {
                new: true
            });
        })
        .catch(error => res.json(error));
});


app.listen(PORT, () => console.log("Get your scientific news on at localhost:" + PORT));