import parse from './utils/markdown.js'

export default (window, dispatcher) => {

    const document = window.document

    const view = model => {
        const markdownComponent = document.createElement('div')
        const textArea = markdownComponent.appendChild(document.createElement('textarea'))
        textArea.innerHTML = model.message()
        textArea.oninput = () => {
            const event = { type: 'input', value: textArea.value }
            const theDispatcher = dispatcher()
            theDispatcher(event)
        }
        let resultElem = markdownComponent.appendChild(document.createElement('div'))
        // parses only headings
        parse(document,model.message()).forEach((e) => resultElem.appendChild(e))
        return markdownComponent
    }


    const renderer = view => {
        document.body.innerHTML = ''
        document.body.appendChild(view)
    }

    return { view, renderer }
}