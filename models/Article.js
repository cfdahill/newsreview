//this will be the mongoose schema for the articles to save to database

const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;