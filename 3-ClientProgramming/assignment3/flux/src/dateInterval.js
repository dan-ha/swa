const dateInterval = (from, to) => {
    const contains = (d) => d>from && d<=to
    return {from, to, contains}
}

export default dateInterval