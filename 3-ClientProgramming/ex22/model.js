const model = (msg) => {
    const message = () => msg
    const updateMessage = newMsg => model(newMsg)
    return { message, updateMessage }
}

export default model