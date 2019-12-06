const store = (init_model, view, renderer) => {

  let model = init_model

  function reducer(action, model) {
    switch (action.type) {
      case 'warnings':
        return model.setWarnings(action.warnings)
      case 'update':
        return model.updateWarning(action.update)
      case 'severity':
        return model.setSeverity(action.severity)
      default:
        return model
    }
  }

  return action => {
    model = reducer(action, model)
    renderer(view(model))
  }
}

export default store