import GeneratedNumber from '../domain/generated_number'
import NumberGenerator from '../domain/number_generator'
import {decimal} from './round_numbers'

const squares = new NumberGenerator(function*() {
    for (const obj of decimal.getGeneratorFunction()) {
        const number = obj.number
        if (number === 1) {
            continue
        }
        yield new GeneratedNumber(number * number, `square of the number ${number.toString()}`, 1.5)
    }
})

export {
    squares
}