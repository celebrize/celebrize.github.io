class NumberGenerator {
    constructor(generatorFnc) {
        this.generatorFnc = generatorFnc
    }

    getGeneratorFunction() {
        return this.generatorFnc()
    }
}

export default NumberGenerator
