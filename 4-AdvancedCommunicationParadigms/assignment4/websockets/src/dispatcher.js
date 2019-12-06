const dispatcher = (store, ws) => ({ type, ...params }) => {
  switch (type) {
    case 'warnings':
      store({ type, ...params })
      break
    case 'update':
      store({ type, ...params })
      break
    case 'severity':
      store({ type, ...params })
      break
    case 'subscribe':
      ws.send('subscribe')
      break
    case 'unsubscribe':
      ws.send('unsubscribe')
      break
    default:
      break;
  }
}

export default dispatcher