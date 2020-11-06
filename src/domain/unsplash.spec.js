const Unsplash = require("./unsplash")
const GeneratedNumber = require("./generated_number")
const GeneratedDate = require("./generated_date")
const Anniversary = require("./anniversary")

describe('isMatch', () => {
    test('returns null if there is nothing to match against', () => {
        const unsplash = new Unsplash("", "", "", "")
        const number = new GeneratedNumber(1, "")
        const date = new GeneratedDate(new Date(), "mock")
        const anniversary = new Anniversary(number, date)

        expect(unsplash.isMatch(anniversary)).toBe(null)
    })
    test('it returns true if it matches a number', () => {
        const unsplash = new Unsplash("", "", "", "", 42)
        const number = new GeneratedNumber(42, "")
        const date = new GeneratedDate(new Date(), "mock")
        const anniversary = new Anniversary(number, date)

        expect(unsplash.isMatch(anniversary)).toBe(true)
    })
    test('it returns false if it does not match a number', () => {
        const unsplash = new Unsplash("", "", "", "", 42)
        const number = new GeneratedNumber(21, "")
        const date = new GeneratedDate(new Date(), "mock")
        const anniversary = new Anniversary(number, date)

        expect(unsplash.isMatch(anniversary)).toBe(false)
    })
    test('it returns true if it has a tag', () => {
        const unsplash = new Unsplash("", "", "", "", "foobar")
        const number = new GeneratedNumber(42, "")
        const date = new GeneratedDate(new Date(), "mock")
        date.addTags("foobar")
        const anniversary = new Anniversary(number, date)

        expect(unsplash.isMatch(anniversary)).toBe(true)
    })
    test('it returns false if it does not have a tag', () => {
        const unsplash = new Unsplash("", "", "", "", "foobar")
        const number = new GeneratedNumber(42, "")
        const date = new GeneratedDate(new Date(), "mock")
        date.addTags("baz")
        const anniversary = new Anniversary(number, date)

        expect(unsplash.isMatch(anniversary)).toBe(false)
    })
    test('it returns true if it matches any tag', () => {
        const unsplash = new Unsplash("", "", "", "", "foo", "bar", "baz")
        const number = new GeneratedNumber(42, "")
        const date = new GeneratedDate(new Date(), "mock")
        date.addTags("baz")
        const anniversary = new Anniversary(number, date)

        expect(unsplash.isMatch(anniversary)).toBe(true)
    })
    test('it returns true if it matches no tag', () => {
        const unsplash = new Unsplash("", "", "", "", "foo", "bar", "baz")
        const number = new GeneratedNumber(42, "")
        const date = new GeneratedDate(new Date(), "mock")
        date.addTags("blubber")
        const anniversary = new Anniversary(number, date)

        expect(unsplash.isMatch(anniversary)).toBe(false)
    })
})
