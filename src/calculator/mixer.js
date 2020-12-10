// takes other mixers and generates a stream of ascending anniversaries
class CalculatorMixer {
    constructor(...calculators) {
        this.calculators = calculators
    }

    isDone() {
        return this.calculators.every(calc => calc.isDone)
    }

    next() {
        let nextIdx = null
        let nextAnniversary = null
        // find the next anniversary
        for (const idx in this.calculators) {
            const calculator = this.calculators[idx]
            if (calculator._current === undefined) {
                calculator._current = calculator.next()
            }
            if (calculator._current) {
                if (nextAnniversary === null || nextAnniversary.getDateObject().getTime() > calculator._current.getDateObject().getTime()) {
                    nextIdx = idx
                    nextAnniversary = calculator._current
                }
            }
        }

        if (nextIdx) {
            this.calculators[nextIdx]._current = this.calculators[nextIdx].next()
        }
        

        return nextAnniversary
    }

}

export default CalculatorMixer
