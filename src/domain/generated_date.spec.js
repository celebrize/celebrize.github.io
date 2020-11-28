import GeneratedDate from './generated_date'

describe('hasTag', () => {
    test('it returns false by default', () => {
        const date = new GeneratedDate(new Date(), "mock")

        expect(date.hasTag("foo")).toBe(false)
        expect(date.hasTag("bar")).toBe(false)
    })
    test('it returns if a tag is set', () => {
        const date = new GeneratedDate(new Date(), "mock")
        date.addTags("foo")

        expect(date.hasTag("foo")).toBe(true)
        expect(date.hasTag("bar")).toBe(false)
    })
})
