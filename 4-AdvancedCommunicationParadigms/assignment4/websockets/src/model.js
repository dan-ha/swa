const model = (warnings = [], updates = [], severity) => {

  const setWarnings = (newWarnigns) => model(newWarnigns.filter(nw => nw.prediction), updates, severity)

  const updateWarning = update => {
    let warningMap = {}
    warnings.forEach(w => warningMap[w.id] = w)

    if (update.prediction == null) {
      delete warningMap[update.id]
    } else {
      warningMap[update.id] = update
    }
    return model(Object.values(warningMap), updates.concat(update), severity)
  }

  const setSeverity = (newSeverity) => model(warnings, updates, newSeverity)

  const getWarnings = () => warnings.filter(w => severity ? w.severity == severity : true)
  const getUpdates = () => updates

  return { getWarnings, setWarnings, updateWarning, setSeverity, getUpdates }
}

export default model