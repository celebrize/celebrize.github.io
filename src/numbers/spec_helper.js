function generatorToNumbers(generator, maxItems, start) {
    start = start || 0

    let items = []
    let index = 0
    for (const item of generator.getGeneratorFunction()) {
        if (index >= maxItems + start) { break }
        if (index >= start) {
            items.push(item.getNumber())
        }
        index++
    }
    return items
}

export {
    generatorToNumbers
}