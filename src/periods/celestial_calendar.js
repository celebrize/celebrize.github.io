const TimePeriod = require('../domain/time_period')

/* Orbits crash course:
 * 
 * @see https://en.wikipedia.org/wiki/Orbital_period
 * 
 * - *sidereal month* means an orbit relative to the fixed stars (aka as seen from outside the solar system)
 * - *synodic month* means an orbit relative to the orbitted object (for instance moon phases as seen from earth)
 */

const lunarMonths = new TimePeriod((now, number) => {
    // @see https://en.wikipedia.org/wiki/Lunar_month#Synodic_month
    const lunarSpan = (((29 * 24) + 12) * 60 + 44) * 60 + 2.8016
    const date = new Date(now)
    date.setTime(now.getTime() + Number(number) * lunarSpan * 1000)
    return date
}, "[lunar month](https://en.wikipedia.org/wiki/Lunar_month#Synodic_month), the number of moon cycles visible from earth")

const lunarOrbits = new TimePeriod((now, number) => {
    // @see https://en.wikipedia.org/wiki/Lunar_month#Sidereal_month
    const lunarSpan = (((27 * 24) + 7) * 60 + 43) * 60 + 11.6
    const date = new Date(now)
    date.setTime(now.getTime() + Number(number) * lunarSpan * 1000)
    return date
}, "[lunar orbits](https://en.wikipedia.org/wiki/Lunar_month#Sidereal_month), the number of times the moon orbited the earth relative to the fixed stars")


const days = 24*60*60
const years = 365.25 * days
const earthOrbitTime = 1.0000174 * years

class Celestial {
    constructor(name, siderealPeriodTime, orbitTime) {
        this.name = name
        this.siderealPeriodTime = siderealPeriodTime
        this.orbitTime = orbitTime

        /* This is the day-night cycle time relative to the sun
         * @see http://www.1728.org/synodic.htm
         */
        this.dayNightCycleTime = 1 / Math.abs(1/this.siderealPeriodTime - 1/this.orbitTime)

        // This is the time where earth and the planet are in the same relation to one another
        this.earthConstellationTime = 1 / Math.abs(1/this.orbitTime - 1/earthOrbitTime)
    }
    getSiderealCalculation() {
        const fnc = (now, number) => {
            const date = new Date(now)
            date.setTime(now.getTime() + Number(number) * this.siderealPeriodTime * 1000)
            return date
        }
        const help = `rotation of ${this.name} relative to the fixed stars`

        return new TimePeriod(fnc, help)
    }
    getOrbitCalculation() {
        const fnc = (now, number) => {
            const date = new Date(now)
            date.setTime(now.getTime() + Number(number) * this.orbitTime * 1000)
            return date
        }
        const help = `orbits of ${this.name} around the sun`

        return new TimePeriod(fnc, help)
    }
    getDayCalculation() {
        const fnc = (now, number) => {
            const date = new Date(now)
            date.setTime(now.getTime() + Number(number) * this.dayNightCycleTime * 1000)
            return date
        }
        const help = `day-night cycles as seen on ${this.name}`

        return new TimePeriod(fnc, help)
    }
    getConstellationCalculation() {
        const fnc = (now, number) => {
            const date = new Date(now)
            date.setTime(now.getTime() + Number(number) * this.earthConstellationTime * 1000)
            return date
        }
        const help = `${this.name} and earth are in the same relation to one another`

        return new TimePeriod(fnc, help)
    }
}

// @see https://ssd.jpl.nasa.gov/?planet_phys_par
const mercury = new Celestial("mercury", 58.6462 * days, 0.2408467 * years)
const venus = new Celestial("venus", -243.018 * days, 0.61519726 * years)
const mars = new Celestial("mars", 1.02595676 * days, 1.8808476 * years)
const jupiter = new Celestial("jupiter", 0.41354 * days, 11.862615 * years)
const saturn = new Celestial("saturn", 0.44401 * days, 29.447498 * years)
const uranus = new Celestial("uranus", -0.71833 * days, 84.016846 * years)
const neptune = new Celestial("neptune", 0.67125 * days, 164.79132 * years)

module.exports = {
    lunarMonths,
    lunarOrbits,
    mercuryDays: mercury.getDayCalculation(),
    mercuryYears: mercury.getOrbitCalculation(),
    // these periods are a bit too absurd for my taste for now
    // mercuryRotations: mercury.getSiderealCalculation(),
    // mercuryConstellation: mercury.getConstellationCalculation(),
    venusDays: venus.getDayCalculation(),
    venusYears: venus.getOrbitCalculation(),
    marsDays: mars.getDayCalculation(),
    marsYears: mars.getOrbitCalculation(),
    jupiterDays: jupiter.getDayCalculation(),
    jupiterYears: jupiter.getOrbitCalculation(),
    saturnDays: saturn.getDayCalculation(),
    saturnYears: saturn.getOrbitCalculation(),
    uranusDays: uranus.getDayCalculation(),
    uranusYears: uranus.getOrbitCalculation(),
    neptuneDays: neptune.getDayCalculation(),
    neptuneYears: neptune.getOrbitCalculation(),
}