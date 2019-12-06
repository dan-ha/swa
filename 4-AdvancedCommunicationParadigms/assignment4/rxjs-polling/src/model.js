const model = (warnings = [], updates = [], severity) => {

  const severityFilter = (collection) => collection.filter(o => severity ? o.severity == severity : true)

  const setWarnings = (newWarnigns) => model(newWarnigns, updates, severity)
  const setUpdates = (newUpdates) => model(warnings, newUpdates, severity)

  const setSeverity = (newSeverity) => model(warnings, updates, newSeverity)

  const getWarnings = () => {
    let warningMap = {}
    warnings.forEach(w => warningMap[w.id] = w)

    updates.forEach(update => {
      if(update.prediction) {
        warningMap[update.id] = update
      } else {
        delete warningMap[update.id]
      }
    })
    return severityFilter(Object.values(warningMap))
  }
  const getUpdates = () => updates

  return { getWarnings, setWarnings,getUpdates, setUpdates, setSeverity }
}

export default model