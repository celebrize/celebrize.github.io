const GeneratedNumber = require('../domain/generated_number')
const NumberGenerator = require('../domain/number_generator')

function* numbers() {
    yield new GeneratedNumber(18, "is considered the [age of majority](https://en.wikipedia.org/wiki/Age_of_majority) in some countries", 1)
    yield new GeneratedNumber(42, "the [Answer to the Ultimate Question of Life, the Universe, and Everything](https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#The_Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_is_42)", 1)
}

module.exports = new NumberGenerator(numbers)