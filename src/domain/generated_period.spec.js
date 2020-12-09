import GeneratedPeriod from './generated_period'

describe('hasTag', () => {
    test('it returns false by default', () => {
        const date = new GeneratedPeriod(new Date(), "mock")

        expect(date.hasTag("foo")).toBe(false)
        expect(date.hasTag("bar")).toBe(false)
    })
    test('it returns if a tag is set', () => {
        const date = new GeneratedPeriod(new Date(), "mock")
        date.addTags("foo")

        expect(date.hasTag("foo")).toBe(true)
        expect(date.hasTag("bar")).toBe(false)
    })
})
