const {
    days,
    weeks,
    months,
    years,
} = require('./calendar.js')

const now = new Date('1969-07-20 20:17:58Z')

describe('days span', () => {
    test('can add one day', () => {
        expect(days(now, 1)).toEqual(new Date('1969-07-21 20:17:58Z'))
    })
    test('can add multiple days', () => {
        expect(days(now, 10)).toEqual(new Date('1969-07-30 20:17:58Z'))
        expect(days(now, 100)).toEqual(new Date('1969-10-28 20:17:58Z'))
        expect(days(now, 1000)).toEqual(new Date('1972-04-15 20:17:58Z'))
    })
    test.skip('can add a huge amount of days', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+50+thousand+days
        // @TODO: it should be 20 hours for sure, when working with a local date
        expect(days(now, 50_000)).toEqual(new Date('2106-06-12 20:17:58Z'))
    })
})

describe('weeks span', () => {
    test('can add one week', () => {
        expect(weeks(now, 1)).toEqual(new Date('1969-07-27 20:17:58Z'))
    })
    test('can add multiple weeks', () => {
        expect(weeks(now, 10)).toEqual(new Date('1969-09-28 20:17:58Z'))
        expect(weeks(now, 100)).toEqual(new Date('1971-06-20 20:17:58Z'))
    })
    test('can add a huge amount of week', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+10000+weeks
        expect(weeks(now, 10_000)).toEqual(new Date('2161-03-15 20:17:58Z'))
    })
})

describe('month span', () => {
    test('can add one month', () => {
        expect(months(now, 1)).toEqual(new Date('1969-08-20 20:17:58Z'))
    })
    test('can add multiple months', () => {
        expect(months(now, 10)).toEqual(new Date('1970-05-20 20:17:58Z'))
        expect(months(now, 100)).toEqual(new Date('1977-11-20 20:17:58Z'))
    })
    test('can add a huge amount of months', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+2000+months
        expect(months(now, 2000)).toEqual(new Date('2136-03-20 20:17:58Z'))
    })
})

describe('year span', () => {
    test('can add one year', () => {
        expect(years(now, 1)).toEqual(new Date('1970-07-20 20:17:58Z'))
    })
    test.skip('can add multiple years', () => {
        expect(years(now, 10)).toEqual(new Date('1979-07-20 20:17:58Z'))
        // @TODO: This is off by one hour. Something is odd here
        expect(years(now, 100)).toEqual(new Date('2069-07-20 20:17:58Z'))
    })
})
