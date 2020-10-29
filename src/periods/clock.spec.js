const {
    seconds,
    minutes,
    hours,
} = require('./clock.js')

const now = new Date('1969-07-20 20:17:58Z')

describe('seconds span', () => {
    test('can add one second', () => {
        expect(seconds.getDate(now, 1)).toEqual(new Date('1969-07-20 20:17:59Z'))
    })
    test('can add multiple seconds', () => {
        expect(seconds.getDate(now, 10)).toEqual(new Date('1969-07-20 20:18:08Z'))
        expect(seconds.getDate(now, 100)).toEqual(new Date('1969-07-20 20:19:38Z'))
        expect(seconds.getDate(now, 1000)).toEqual(new Date('1969-07-20 20:34:38Z'))
    })
    test('can add a huge amount of seconds', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+six+billion+seconds
        expect(seconds.getDate(now, 6_000_000_000n)).toEqual(new Date('2159-09-07 06:57:58Z'))
    })
})

describe('minute span', () => {
    test('can add one minute', () => {
        expect(minutes.getDate(now, 1)).toEqual(new Date('1969-07-20 20:18:58Z'))
    })
    test('can add multiple minutes', () => {
        expect(minutes.getDate(now, 10)).toEqual(new Date('1969-07-20 20:27:58Z'))
        expect(minutes.getDate(now, 100)).toEqual(new Date('1969-07-20 21:57:58Z'))
        expect(minutes.getDate(now, 1000)).toEqual(new Date('1969-07-21 12:57:58Z'))
    })
    test.skip('can add a huge amount of minutes', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+one+hundred+million+minutes
        // @TODO: Wolfram Alpha says it is one hour later. Find out who is right.
        expect(minutes.getDate(now, 100_000_000n)).toEqual(new Date('2159-09-07 06:57:58Z'))
    })
})

describe('hour span', () => {
    test('can add one hour', () => {
        expect(hours.getDate(now, 1)).toEqual(new Date('1969-07-20 21:17:58Z'))
    })
    test('can add multiple hours', () => {
        expect(hours.getDate(now, 10)).toEqual(new Date('1969-07-21 06:17:58Z'))
        expect(hours.getDate(now, 100)).toEqual(new Date('1969-07-25 00:17:58Z'))
        expect(hours.getDate(now, 1000)).toEqual(new Date('1969-08-31 12:17:58Z'))
    })
    test.skip('can add a huge amount of hours', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+one+million+hours
        // @TODO: Wolfram Alpha says it is one hour later. Find out who is right.
        expect(hours.getDate(now, 1_000_000n)).toEqual(new Date('2083-08-18 12:17:58Z'))
    })
})
