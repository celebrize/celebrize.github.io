const {
    lunarMonths,
    lunarOrbits,
    mercuryDays,
    mercuryYears,
    venusDays,
    venusYears,
    marsDays,
    marsYears,
    jupiterDays,
    jupiterYears,
    saturnDays,
    saturnYears,
    uranusDays,
    uranusYears,
    neptuneDays,
    neptuneYears,
} = require('./celestial_calendar.js')

const now = new Date('1969-07-20 20:17:58Z')

describe('lunar month span', () => {
    test('can add one lunar month', () => {
        const expected = new Date('1969-08-19 09:02:00.800Z')
        const real = lunarMonths(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of lunar months', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1000+lunations

        const expected = new Date('2050-05-27 10:24:38Z')
        const real = lunarMonths(now, 1000)
        const deviation = 600
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('lunar month span', () => {
    test('can add one lunar orbit', () => {
        const expected = new Date('1969-08-17 04:01:10Z')
        const real = lunarOrbits(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of lunar orbits', () => {
        const expected = new Date('2044-05-09 12:17:58Z')
        const real = lunarOrbits(now, 1000)
        const deviation = 600
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('mercury day span', () => {
    test('can add one mercury day', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+mercury+solar+day
        const expected = new Date('1970-01-12 18:49:47Z')
        const real = mercuryDays(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of mercury days', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+200+mercury+solar+days
        const expected = new Date('2065-11-21 14:24:06Z')
        const real = mercuryDays(now, 200)
        const deviation = 200
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('mercury year span', () => {
    test('can add one mercury year', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+mercury+year
        const expected = new Date('1969-10-16 19:33:41Z')
        const real = mercuryYears(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of mercury years', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+500+mercury+year
        const expected = new Date('2089-12-22 11:23:07Z')
        const real = mercuryYears(now, 500)
        const deviation = 500
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('venus day span', () => {
    test('can add one venus day', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+venus+solar+day
        const expected = new Date('1969-11-14 14:18:29Z')
        const real = venusDays(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of venus days', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+500+venus+solar+days
        const expected = new Date('2129-05-18 00:38:08Z')
        const real = venusDays(now, 500)
        const deviation = 500
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('venus year span', () => {
    test('can add one venus year', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+venus+year
        const expected = new Date('1970-03-02 13:07:07Z')
        const real = venusYears(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of venus years', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+200+venus+year
        const expected = new Date('2092-08-04 00:08:08Z')
        const real = venusYears(now, 200)
        const deviation = 200
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('mars day span', () => {
    test('can add one mars day', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+mars+solar+day
        const expected = new Date('1969-07-21 20:57:33Z')
        const real = marsDays(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of mars days', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+50000+mars+solar+days
        const expected = new Date('2110-03-18 09:47:47Z')
        const real = marsDays(now, 50000)
        const deviation = 50000
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('mars year span', () => {
    test('can add one mars year', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+mars+year
        const expected = new Date('1971-06-07 19:48:34Z')
        const real = marsYears(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of mars years', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+100+mars+year
        const expected = new Date('2157-08-21 19:18:20Z')
        const real = marsYears(now, 100)
        const deviation = 100
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('jupiter day span', () => {
    test('can add one jupiter day', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+jupiter+solar+day
        const expected = new Date('1969-07-21 06:13:31Z')
        const real = jupiterDays(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of jupiter days', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+100000+jupiter+solar+days
        const expected = new Date('2082-10-13 19:02:09Z')
        const real = jupiterDays(now, 100000)
        const deviation = 100000
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('jupiter year span', () => {
    test('can add one jupiter year', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+jupiter+year
        const expected = new Date('1981-05-31 15:58:57Z')
        const real = jupiterYears(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('saturn day span', () => {
    test('can add one saturn day', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+saturn+solar+day
        const expected = new Date('1969-07-21 06:57:22Z')
        const real = saturnDays(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of saturn days', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+100000+saturn+solar+days
        const expected = new Date('2091-02-13 16:17:30Z')
        const real = saturnDays(now, 100000)
        const deviation = 100000
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('saturn year span', () => {
    test('can add one saturn year', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+saturn+year
        const expected = new Date('1998-12-31 13:04:00Z')
        const real = saturnYears(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('uranus day span', () => {
    test('can add one uranus day', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+uranus+solar+day
        const expected = new Date('1969-07-21 13:32:20Z')
        const real = uranusDays(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of uranus days', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+100000+uranus+solar+days
        const expected = new Date('2166-03-21 03:56:41Z')
        const real = uranusDays(now, 100000)
        const deviation = 100000
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('uranus year span', () => {
    test('can add one uranus year', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+uranus+year
        const expected = new Date('2053-07-26 23:58:17Z')
        const real = uranusYears(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('neptune day span', () => {
    test('can add one neptune day', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+neptune+solar+day
        const expected = new Date('1969-07-21 12:24:34Z')
        const real = neptuneDays(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
    test('can add a huge amount of neptune days', () => {
        //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+100000+neptune+solar+days
        const expected = new Date('2153-05-02 14:15:56Z')
        const real = neptuneDays(now, 100000)
        const deviation = 100000
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
describe('neptune year span', () => {
    test('can add one neptune year', () => {
        // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+neptune+year
        const expected = new Date('2134-05-06 21:00:38Z')
        const real = neptuneYears(now, 1)
        const deviation = 1
        const min = new Date(expected)
        min.setSeconds(min.getSeconds() - deviation)
        const max = new Date(expected)
        max.setSeconds(max.getSeconds() + deviation)
        expect(real.getTime()).toBeGreaterThan(min.getTime())
        expect(real.getTime()).toBeLessThan(max.getTime())
    })
})
// describe('mercury rotation span', () => {
//     test('can add one mercury rotation', () => {
//         // @see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1+mercury+rotation+period&assumption=%7B%22MC%22%2C+%22rotation+period%22%7D+-%3E+%7B%22PlanetProperty%22%7D
//         const expected = new Date('1969-09-17 11:48:29Z')
//         const real = mercuryRotations(now, 1)
//         const deviation = 1
//         const min = new Date(expected)
//         min.setSeconds(min.getSeconds() - deviation)
//         const max = new Date(expected)
//         max.setSeconds(max.getSeconds() + deviation)
//         expect(real.getTime()).toBeGreaterThan(min.getTime())
//         expect(real.getTime()).toBeLessThan(max.getTime())
//     })
//     test('can add a huge amount of mercury rotations', () => {
//         //@see https://www.wolframalpha.com/input/?i=1969-07-20+20%3A17%3A58+UTC+plus+1000+mercury+rotation+period&assumption=%7B%22MC%22%2C+%22rotation+period%22%7D+-%3E+%7B%22PlanetProperty%22%7D
//         const expected = new Date('2130-02-13 01:05:58Z')
//         const real = mercuryRotations(now, 1000)
//         const deviation = 1000
//         const min = new Date(expected)
//         min.setSeconds(min.getSeconds() - deviation)
//         const max = new Date(expected)
//         max.setSeconds(max.getSeconds() + deviation)
//         expect(real.getTime()).toBeGreaterThan(min.getTime())
//         expect(real.getTime()).toBeLessThan(max.getTime())
//     })
// })
