const usersController = require('./../controllers/user.ctrl')

const usersRoute = (router) => {
    //Get a user
    router.route('/users/:id').get(usersController.getUser)

    //Get a user profile
    router.route('/users/profile/:id').get(usersController.getUserProfile)

    //Adds a user
    router.route('/users').post(usersController.addUser)

    //Follow a user
    router.route('/users/follow').post(usersController.followUser)
}

module.exports = usersRoute