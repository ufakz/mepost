const defaultState = {
    appName: '',
    modalMode: false
}

const commonReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            console.log(`toggling moda: ${action.modalMode}`)
            return {
                ...defaultState,
                modalMode: action.modalMode
            }

        default:
            return state
    }
}

export default commonReducer