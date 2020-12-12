import CelestialFixedStar from '../domain/celestial_fixed_star'
import {calcOddity} from './stellar_light'



describe("calcOddity", () => {

    function mockStar(magnitude) {
        return new CelestialFixedStar("Mock", null, null, magnitude, null, null, null)
    }
    test('it is 1 for stars with magnitude < 2.5', () => {
        const star1 = mockStar(-2) 
        const star2 = mockStar(0) 
        const star3 = mockStar(1) 
        const star4 = mockStar(2) 
        const star5 = mockStar(2.4)

        expect(calcOddity(star1)).toEqual(1)
        expect(calcOddity(star2)).toEqual(1)
        expect(calcOddity(star3)).toEqual(1)
        expect(calcOddity(star4)).toEqual(1)
        expect(calcOddity(star5)).toEqual(1)
    })
    test('it is 3 for stars with magnitude > 4.5', () => {
        const star1 = mockStar(4.6) 
        const star2 = mockStar(5) 
        const star3 = mockStar(6) 
        expect(calcOddity(star1)).toEqual(3)
        expect(calcOddity(star2)).toEqual(3)
        expect(calcOddity(star3)).toEqual(3)
    })
    test('it gradualy increases between 2.5 and 4.5', () => {
        let lastOddity = 0
        for(let i=2.5; i<=4.5; i+=0.1) {
            const star = mockStar(i)
            const oddity = calcOddity(star)
            expect(oddity).toBeGreaterThan(lastOddity)
            expect(oddity).toBeLessThan(3)
            lastOddity = oddity
        }
    })
})
