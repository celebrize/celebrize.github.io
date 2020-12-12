class CalculatorMinMax {
    constructor(calculator, minDate, maxDate) {
        this.calculator = calculator
        this.minDate = minDate
        this.maxDate = maxDate
        this.done = false
    }

    isDone() {
        return this.done || this.calculator.isDone()
    }

    next() {
        while(true) {
            if (this.calculator.isDone()) {
                return
            }
            const next = this.calculator.next()
            if (!next) {
                return
            }
            if (this.minDate && next.getTime() < this.minDate.getTime()) {
                continue
            }
            if (this.maxDate && next.getTime() > this.maxDate.getTime()) {
                this.done = true
                return
            }
            return next
        }
    }
}

export default CalculatorMinMax
