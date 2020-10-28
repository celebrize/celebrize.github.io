function* fibonacci() {
    let previous = 0
    let current = 1
    let index = 1
    while (true) {
        const oldPrevious = previous
        previous = current
        current = current + oldPrevious
        index++
        yield {
            number: current,
            help: `${current} is the ${index}th Fibonacci number`
        }
    }
}

module.exports = fibonacci