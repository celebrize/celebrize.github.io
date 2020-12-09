import VisibleStars, { warnings, convertDesignation } from './visible_stars'

function findStar(name) {
    const star = VisibleStars.find(a => a.name === name)
    expect(star).toBeTruthy()
    return star
}

test("it should not be empty", () => {
    expect(VisibleStars.length).toBeGreaterThan(0)
})

const expectedNames =[
    "HD 189340",
    "Alpha Lacertae",
    "Phi² Ceti",
    "17 Crateris A",
    "Sigma Coronae Borealis A",
    "q¹ Eridani",
    "Psi Velorum A",
    "Eta¹ Pictoris",
    "Tau⁶ Eridani",
    "Upsilon Aquarii",
    "Nu Phoenicis",
    "p Eridani A",
    "Syrma",
    "Cebalrai",
]

const names = VisibleStars.map(star => star.name)

expectedNames.forEach(name => {
    it(`should contain ${name}`, () => {
        expect(names).toContain(name)
    })
})

describe("Wikipedia Id", () => {
    const testData = [
        ["17 Crateris A", "17_Crateris"], // on twin stars, go to the appearant star
        ["Alpha Lacertae", "Alpha_Lacertae"],
        ["Tau⁶ Eridani", "Tau6_Eridani"],
        ["Sigma Coronae Borealis A", "Sigma_Coronae_Borealis"],
        ["Cebalrai", "Cebalrai"],
        ["Mu² Cancri", "Mu2_Cancri"],
    ]

    testData.forEach(([starName, expectedWikipediaId]) => {
        test(`${starName} has wikipedia id ${expectedWikipediaId}`, () => {
            const star = findStar(starName)
            expect(star.wikipediaId).toEqual(expectedWikipediaId)
        })
    })
})

describe("Correct data", () => {

    const testData = [
        ["HD 30562", 4.810107, -5.6740, 5.77, 85.4],
        ["HD 219134", 23.22138231, 57.16836, 5.574, 21.35],
        ["94 Aquarii", 23.3185349, -12.5412182, 5.19, 72.6],
        ["72 Ophiuchi", 18.12249554, 9.5638473, 3.73, 86.9],
        ["Kappa Coronae Borealis", 15.8538, 35.6573, 4.79, 98.1],
        ["I Carinae", 10.4065, -74.031, 3.99, 52.9],
        ["Gamma Doradus", 4.26710784, -50.5133558, 4.25, 66.7],
    ]

    testData.forEach(([name, expRa, expDec, expMag, expDist]) => {
        const star = findStar(name)
        test(`${name} should have correct declination`, () => {
            expect(star.declination).toBeGreaterThan(expDec - 1)
            expect(star.declination).toBeLessThan(expDec + 1)
        })
        test(`${name} should have correct right ascension`, () => {
            expect(star.rightAscension).toBeGreaterThan(expRa - 0.1)
            expect(star.rightAscension).toBeLessThan(expRa + 0.1)
        })
        test(`${name} should have correct appearant magnitude`, () => {
            expect(star.apparentMagnitude).toBeGreaterThan(expMag * 0.95)
            expect(star.apparentMagnitude).toBeLessThan(expMag * 1.05)
        })
        test(`${name} should have correct distance`, () => {
            expect(star.distance).toBeGreaterThan(expDist * 0.99)
            expect(star.distance).toBeLessThan(expDist * 1.01)
        })
    })
})

describe("There should be no warnings during import", () => {
    it("should not have warnings", () => {
        expect(warnings.length).toEqual(0)
    })
    warnings.forEach((warning, i) => {
        test(`it should not have import warnings #${i}`, () => {
            expect(warning).toBeFalsy()
        })
    })
})

describe("convertDesignation", () => {
    const testData = [
        // it passes through digits
        ["1", "1"],
        ["12", "12"],
        ["123", "123"],

        // single letters are left intact
        ["a", "a"],
        ["A", "A"],
        ["b", "b"],
        ["B", "B"],
        ["alf", "Alpha"],
        ["bet", "Beta"],

        // it can add digits
        ["d01", "d¹"],
        ["E02", "E²"],
        ["zet03", "Zeta³"],
        ["tau06", "Tau⁶"],
    ]

    testData.forEach(([input, expectedOutput]) => {
        test(`it converts ${input} to ${expectedOutput}`, () => {
            expect(convertDesignation(input)).toEqual(expectedOutput)
        })
    })
})

it("should be ordered ascending", () => {
    let lastDistance = 0
    VisibleStars.forEach(star => {
        expect(star.distance).toBeGreaterThanOrEqual(lastDistance)
        lastDistance = star.distance
    })
})