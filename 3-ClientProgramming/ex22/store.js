export default (init_model, view, renderer) => {
    let model = init_model

    function reducer(action, model) {
        switch (action.type) {
            case 'input':
                return model.updateMessage(action.value)
            default:
                return model
        }
    }

    return action => {
        model = reducer(action, model)
        renderer(view(model))
    }
}