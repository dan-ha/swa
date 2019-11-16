export default function parse(document, text) {
    const paragraphs = text.split('\n')
    const processedParagraphs = paragraphs.map(processParagraph)
    const theGenerateElement = generateElement(document)
    return processedParagraphs.map(theGenerateElement)
}

function processParagraph(paragraph) {
    let header = 0
    paragraph = paragraph.trim()
    while (paragraph.charAt(0) == '#') {
        paragraph = paragraph.slice(1)
        header++
    }
    return { tag: (header == 0 ? 'p' : 'h' + header), content: paragraph }
}

const generateElement = document => ({tag, content}) => {
    let element = document.createElement(tag)
    element.appendChild(document.createTextNode(content))
    return element
}
