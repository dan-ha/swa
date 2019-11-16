export default store => ({ type, ...params }) => {
    switch (type) {
        case 'input':
            const { value } = params
            store({ type, value })
            break
        default:
            break
    }
}