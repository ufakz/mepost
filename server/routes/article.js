const articleController = require('./../controllers/article.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

const articlesRoute = (router) => {
    //Get all articles
    router.route('/articles').get(articleController.getAll)

    //Add an article
    router.route('/article').post(multipartWare, articleController.addArticle)

    //Clap on an article
    router.route('/article/comment').post(articleController.commentArticle)

    //Get a particular article to view
    router.route('/article/:id').get(articleController.getArticle)
}

module.exports = articlesRoute