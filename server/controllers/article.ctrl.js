const Article = require('./../models/Article')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary').v2

const articleController = {
    addArticle: (req, res, next) => {
        let { text, title, claps, description } = req.body

        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = { text, title, claps, description, featureImg: result.url != null ? result.url : '' }
                saveArticle(obj)
            }, {
                resource_type: 'image',
                eager: [
                    { effect: 'sepia' }
                ]
            })
        } else {
            saveArticle({ text, title, claps, description, featureImg: '' })
        }

        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(400)
                else {
                    return article.AddAuthor(req.body.author_id).then((_article) => {
                        return res.send(_article)
                    })
                }
                next()
            })
        }
    },

    getAll: (req, res, next) => {
        Article.find(req.params.id)
            .populate('author')
            .populate('comments.author')
            .exec((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(404)
                else
                    res.send(article)

                next()
            })
    },

    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
            .populate('author')
            .populate('comments.author')
            .exec((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(404)
                else
                    res.send(article)
                next()
            })
    },

    clapArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then((article) => {
            return article.clap().then(() => {
                return res.json({ msg: "Done" })
            })
        }).catch(next)
    },

    commentArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then((article) => {
            return article.comment({
                author: req.body.author_id,
                text: req.body.commentArticle
            }).then(() => {
                return res.json({ msg: "Done" })
            })
        }).catch(next)
    },

}