import CalculatorMixer from './mixer'
import NumberPeriodCalculator from './number_period'

// generates new dates from multiple numberGenerators and a periods

class NumberPeriodsCalculator {
    constructor(birthday) {
        this.birthday = birthday
        this.periods = []
        this.numberGenerators = []
        this.mixer = null
    }

    addPeriod(period) {
        if (this.started) {
            throw new Error("Can not add periods after calculator started")
        }
        this.periods.push(period)
    }

    addPeriods(periods) {
        if (this.started) {
            throw new Error("Can not add periods after calculator started")
        }
        this.periods.push(...periods)
    }

    addNumberGenerator(generator) {
        if (this.started) {
            throw new Error("Can not add periods after calculator started")
        }
        this.numberGenerators.push(generator)
    }

    addNumberGenerators(generators) {
        if (this.started) {
            throw new Error("Can not add periods after calculator started")
        }
        this.numberGenerators.push(...generators)
    }

    isDone() {
        return this.mixer && this.mixer.isDone()
    }


    next() {
        if (!this.mixer) { 
            const calculators = []
            for (const numberGenerator of this.numberGenerators) {
                for (const period of this.periods) {
                    const calc = new NumberPeriodCalculator(numberGenerator, period, this.birthday)
                    calculators.push(calc)
                }
            }
            this.mixer = new CalculatorMixer(...calculators)
        }

        return this.mixer.next()
    }
}

export default NumberPeriodsCalculator
