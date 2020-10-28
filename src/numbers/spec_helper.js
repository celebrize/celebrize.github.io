function iteratorToNumbers(iterator, maxItems, start) {
    start = start || 0

    let items = []
    let index = 0
    for (const item of iterator) {
        if (index >= maxItems + start) { break }
        if (index >= start) {
            items.push(item.number)
        }
        index++
    }
    return items
}

module.exports = {
    iteratorToNumbers
}