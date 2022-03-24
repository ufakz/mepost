import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api" : "http://localhost:5000/api"

export function loadArticles() {
    return (dispatch) => {
        axios.get(`${url}/articles`)
            .then((res) => {
                let articles = res.data
                dispatch({ type: 'LOAD_ARTICLES', articles })
            }).catch((err) => {
                console.log(err)
            })
    }
}

export function getUser(_id) {
    return axios.get(`${url}/users/${_id}`).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function getUserProfile(_id) {
    return (dispatch) => {
        axios.get(`${url}/users/profile/${_id}`).then((res) => {
            let profile = res.data
            dispatch({ type: 'SET_PROFILE', profile })
        }).catch(err => console.log(err))
    }
}

export function getArticle(article_id) {
    return (dispatch) => {
        axios.get(`${url}/articles/${article_id}`)
            .then((res) => {
                let article = res.data
                dispatch({ type: 'VIEW_ARTICLE', article })
            }).catch(err => console.log(err))
    }
}

export function clap(article_id) {
    return (dispatch) => {
        axios.post(`${url}/articles/clap`, { article_id }).then((res) => {
            dispatch({ type: 'CLAP_ARTICLE' })
        }).catch(err => console.log(err))
    }
}

export function follow(id, user_id) {
    return (dispatch) => {
        axios.get(`${url}/users/follow`, { id, user_id }).then((res) => {
            dispatch({ type: 'FOLLOW_USER', user_id })
        }).catch(err => console.log(err))
    }
}

export function signInUser(user_data) {
    return (dispatch) => {
        axios.post(`${url}/users`, user_data).then((res) => {
            let user = res.data
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({ type: 'SET_USER', user })
        }).catch(err => console.log(err))
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: false })
    }
}

export function toggleOpen() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: true })
    }
}