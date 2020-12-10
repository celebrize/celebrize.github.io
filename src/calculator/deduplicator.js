// resolves anniversaries that happen on the same day
class CalculatorDeduplicator {
    constructor(calculator) {
        this.calculator = calculator
        this.currentValue = null
    }

    isDone() {
        return this.calculator.isDone() && !this.currentValue
    }

    next() {
        if (this.currentValue === null) {
            this.currentValue = this.calculator.next()
        }
        if (!this.currentValue) {
            return null
        }
        while(true) {
            const next = this.calculator.next()
            if(next && this.currentValue.getDateObject().toLocaleDateString() === next.getDateObject().toLocaleDateString()) {
                // duplicate date
                if(this.currentValue.getOddity() > next.getOddity()) {
                    this.currentValue = next
                } else {
                    // just drop the "next" date
                }
            } else {
                // new date, so this.current is the best value for the previous date
                const theReturn = this.currentValue
                this.currentValue = next
                
                return theReturn
            }
        }
    }

}

export default CalculatorDeduplicator
