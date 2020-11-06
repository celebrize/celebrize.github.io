const GeneratedNumber = require("./generated_number")

describe('hasTag', () => {
    test('it returns false by default', () => {
        const number = new GeneratedNumber(1)

        expect(number.hasTag("foo")).toBe(false)
        expect(number.hasTag("bar")).toBe(false)
    })
    test('it returns if a tag is set', () => {
        const number = new GeneratedNumber(1)
        number.addTags("foo")

        expect(number.hasTag("foo")).toBe(true)
        expect(number.hasTag("bar")).toBe(false)
    })
})
