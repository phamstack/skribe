export default (state = [], action) => {
    // optimal: switch >> if
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        default:
            return state;
    }
}