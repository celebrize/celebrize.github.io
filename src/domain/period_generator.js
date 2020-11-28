class PeriodGenerator {
    constructor(generatorFnc) {
        this.generatorFnc = generatorFnc
    }

    generateDate(now, number) {
        return this.generatorFnc(now, number)
    }
}
export default PeriodGenerator
