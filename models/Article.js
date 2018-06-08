//this will be the mongoose schema for the articles to save to database

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

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

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;