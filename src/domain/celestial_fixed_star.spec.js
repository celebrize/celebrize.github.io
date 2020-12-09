import CelestialFixedStar from './celestial_fixed_star'
import {parseRightAscension, normalizeDegrees, degToRad, getSunEquatorialCoordinates} from './celestial_fixed_star'

describe('normalizeDegrees', () => {
    const testData = [
        [0, 0],
        [180, 180],
        [360, 0],
        [540, 180],
        [720, 0],
        [-90, 270],
        [-180, 180],
        [-270, 90],
    ]

    testData.forEach(([input, expected]) => {
        test(`expect ${input}° is normalized to ${expected}°`, () => {
            expect(normalizeDegrees(input)).toEqual(expected)
        })
    })
})

describe('getSunEquatorialCoordinates', () => {
    // @see https://www.wolframalpha.com/input/?i=declination+and+right+ascension+of+the+sun+on+2020%2F01%2F01+00%3A00+UTC
    const testData = [
        [new Date("2020-01-01T00:00:00Z"), 18.73, -23.06],
        [new Date("2020-02-01T00:00:00Z"), 20.94, -17.31],
        [new Date("2020-03-01T00:00:00Z"), 22.82, -7.492],
        [new Date("2020-04-01T00:00:00Z"), 0.719, 4.636],
        [new Date("2020-05-01T00:00:00Z"), 2.577, 15.15],
        [new Date("2020-06-01T00:00:00Z"), 4.627, 22.08],
        [new Date("2020-07-01T00:00:00Z"), 6.698, 23.08],
        [new Date("2020-08-01T00:00:00Z"), 8.777, 17.95],
        [new Date("2020-09-01T00:00:00Z"), 10.71, 8.184],
        [new Date("2020-10-01T00:00:00Z"), 12.51, -3.283],
        [new Date("2020-11-01T00:00:00Z"), 14.44, -14.5],
        [new Date("2020-12-01T00:00:00Z"), 16.5, -21.84],
    ]

    testData.forEach(([date, expectedRa, expectedDec]) => {
        test(`expect sun to be at ${expectedRa}h right ascension and ${expectedDec}° declination on ${date.toISOString()}`, () => {
            const [ra, dec] = getSunEquatorialCoordinates(date)
            expect(dec).toBeGreaterThan(expectedDec - 0.1)
            expect(dec).toBeLessThan(expectedDec + 0.1)
            expect(ra).toBeGreaterThan(expectedRa - 0.01)
            expect(ra).toBeLessThan(expectedRa + 0.01)
        })
    })
})

describe('rightAscension', () => {
    test('it parses coordinates in sexagesimal notation', () => {
        const polaris = new CelestialFixedStar("Polaris", "02h31m49.09s", `+89°15'50.8"`)

        expect(polaris.rightAscension).toBeGreaterThan(2.4)
        expect(polaris.rightAscension).toBeLessThan(2.6)

        expect(polaris.declination).toBeGreaterThan(89.25)
        expect(polaris.declination).toBeLessThan(89.3)

        const acrux = new CelestialFixedStar("Acrux", "12h26m35.89522s", `-63°05'56.7343"`)

        expect(acrux.rightAscension).toBeGreaterThan(12.4)
        expect(acrux.rightAscension).toBeLessThan(12.5)

        expect(acrux.declination).toBeGreaterThan(-63.1)
        expect(acrux.declination).toBeLessThan(-63.05)
    })
    test('it parses coordinates in decimal degree notation', () => {
        const polaris = new CelestialFixedStar("Polaris", "037.9461°", "+89.2641°")

        expect(polaris.rightAscension).toBeGreaterThan(2.4)
        expect(polaris.rightAscension).toBeLessThan(2.6)

        expect(polaris.declination).toBeGreaterThan(89.25)
        expect(polaris.declination).toBeLessThan(89.3)

        const acrux = new CelestialFixedStar("Acrux", "186.6495°", "-63.0991°")

        expect(acrux.rightAscension).toBeGreaterThan(12.4)
        expect(acrux.rightAscension).toBeLessThan(12.5)

        expect(acrux.declination).toBeGreaterThan(-63.1)
        expect(acrux.declination).toBeLessThan(-63.05)
    })
})

describe('isInView', () => {
    const polaris = new CelestialFixedStar("Polaris", "02h31m49.09s", `+89°15'50.8"`)
    const acrux = new CelestialFixedStar("Acrux", "12h26m35.89522s", `-63°05'56.7343"`)
    const antares = new CelestialFixedStar("Antares", "16h29m24.45970s", `-26°25'55.2094"`)
    const betelgeuse = new CelestialFixedStar("Betelgeuse", "05h55m10.30536s", `+07°24'25.4304"`)
    const longyearbyen = {
        name: "Longyearbyen, Norway",
        latitude: 78.22,
    }
    const berlin = {
        name: "Berlin, Germany",
        latitude: 52.518611,
    }
    const phnomPenh = {
        name: "Phnom Penh, Cambodia",
        latitude: 11.569444,
    }
    const lima = {
        name: "Lima, Peru",
        latitude: -12.05,
    }
    const sydney = {
        name: "Sydney, Australia",
        latitude: -33.865,
    }
    const mcmurdo = {
        name: "McMurdo Station, Antarctica",
        latitude: -77.846323
    }

    const march = new Date("2020-03-21")
    const june = new Date("2020-06-21")
    const september = new Date("2020-09-21")
    const december = new Date("2020-12-21")

    const testData = [
        // polaris is always visible from central europe
        [ polaris, berlin, march, true ],
        [ polaris, berlin, june, true ],
        [ polaris, berlin, september, true ],
        [ polaris, berlin, december, true ],
        // polaris is never visible from the southern hemisphere
        [ polaris, sydney, march, false ],
        [ polaris, sydney, june, false ],
        [ polaris, sydney, september, false ],
        [ polaris, sydney, december, false ],
        // Polaris is not visible during midnight sun
        [ polaris, longyearbyen, march, true ],
        [ polaris, longyearbyen, june, false ],
        [ polaris, longyearbyen, september, true ],
        [ polaris, longyearbyen, december, true ],
        // Acrux is never visible from central europe
        [ acrux, berlin, march, false ],
        [ acrux, berlin, june, false ],
        [ acrux, berlin, september, false ],
        [ acrux, berlin, december, false ],
        // Acrux is always visible from the southern hemisphere
        [ acrux, sydney, march, true ],
        [ acrux, sydney, june, true ],
        [ acrux, sydney, september, true ],
        [ acrux, sydney, december, true ],
        // Acrux is not visible during midnight sun
        [ acrux, mcmurdo, march, true ],
        [ acrux, mcmurdo, june, true ],
        [ acrux, mcmurdo, september, true ],
        [ acrux, mcmurdo, december, false ],
        // Betelgeuse is only visible in winter from central europe
        [ betelgeuse, berlin, december, true ],
        [ betelgeuse, berlin, june, false ],
        // Antares is not visible anywhere on earth during december (because its visibility is blocked by the sun)
        [ antares, berlin, december, false ],
        [ antares, longyearbyen, december, false ],
        [ antares, phnomPenh, december, false ],
        [ antares, lima, december, false ],
        [ antares, sydney, december, false ],
        [ antares, mcmurdo, december, false ],
    ]
    
    testData.forEach(([star, location, date, expectedResult]) => {
        test(`${star.name} ${expectedResult ? "is" : "is not"} visible from ${location.name} at ${date.toLocaleDateString("en-GB")}`, () => {
            expect(star.isInView(location.latitude, date)).toBe(expectedResult)
        })
    })
})
