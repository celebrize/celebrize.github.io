const Anniversary = require("./anniversary")
const GeneratedNumber = require("./generated_number")
const TimePeriod = require("./time_period")

describe('getStaticId', () => {
    test('is a number that is consistent with its number and its time period', () => {
        const number = new GeneratedNumber(1)
        const timePeriod = new TimePeriod()
        const date = new Date('1969-07-20 20:17:58Z')
        const anniversary = new Anniversary(number, timePeriod, date)

        expect(anniversary.getStaticId()).toBeGreaterThan(0)
        expect(anniversary.getStaticId()).toEqual(anniversary.getStaticId())

        const anniversary2 = new Anniversary(number, timePeriod, date)

        expect(anniversary2.getStaticId()).toEqual(anniversary.getStaticId())
    })
    test('is different for different dates and does not end in the same digits', () => {
        
        const number = new GeneratedNumber(1)
        const timePeriod = new TimePeriod()
        const date = new Date('1969-07-20 20:17:58Z')
        const date2 = new Date(date)
        date2.setFullYear(date.getFullYear() + 1)
        const anniversary = new Anniversary(number, timePeriod, date)
        const anniversary2 = new Anniversary(number, timePeriod, date2)

        expect(anniversary.getStaticId()).not.toEqual(anniversary2.getStaticId())

        // to prevent duplicate images for tiles that are 24h apart
        expect(anniversary.getStaticId() % 1000).not.toEqual(anniversary2.getStaticId() % 1000)
    })
})
