const users = require('./users')
const articles = require('./articles')

module.exports = (router) => {
    users(router)
    articles(router)
}