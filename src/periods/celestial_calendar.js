import PeriodGenerator from '../domain/period_generator'
import GeneratedDate from '../domain/generated_date'

/* Orbits crash course:
 * 
 * @see https://en.wikipedia.org/wiki/Orbital_period
 * 
 * - *sidereal month* means an orbit relative to the fixed stars (aka as seen from outside the solar system)
 * - *synodic month* means an orbit relative to the orbitted object (for instance moon phases as seen from earth)
 */

const lunarMonths = new PeriodGenerator((now, number) => {
    // @see https://en.wikipedia.org/wiki/Lunar_month#Synodic_month
    const lunarSpan = (((29 * 24) + 12) * 60 + 44) * 60 + 2.8016
    const date = new Date(now)
    date.setTime(now.getTime() + Number(number) * lunarSpan * 1000)

    const genDate = new GeneratedDate(date, "lunar months", 1.2)
    genDate.setHelpText("a [synodic month](https://en.wikipedia.org/wiki/Lunar_month#Synodic_month) – the number of moon cycles visible from earth")
    genDate.addTags(PeriodGenerator.MONTHISH)
    genDate.addTags("moon")
    return genDate
})

const lunarOrbits = new PeriodGenerator((now, number) => {
    // @see https://en.wikipedia.org/wiki/Lunar_month#Sidereal_month
    const lunarSpan = (((27 * 24) + 7) * 60 + 43) * 60 + 11.6
    const date = new Date(now)
    date.setTime(now.getTime() + Number(number) * lunarSpan * 1000)

    const genDate = new GeneratedDate(date, "lunar orbits", 1.5)
    genDate.setHelpText("a [sidereal month](https://en.wikipedia.org/wiki/Lunar_month#Sidereal_month), the number of times the moon orbited the earth relative to the fixed stars")
    genDate.addTags(PeriodGenerator.MONTHISH)
    genDate.addTags("moon")
    return genDate
})

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
    // getSiderealCalculation() {
    //     const fnc = (now, number) => {
    //         const date = new Date(now)
    //         date.setTime(now.getTime() + Number(number) * this.siderealPeriodTime * 1000)
    //         return date
    //     }
    // }
    getOrbitCalculation(oddity) {
        const fnc = (now, number) => {
            const date = new Date(now)
            date.setTime(now.getTime() + Number(number) * this.orbitTime * 1000)

            const genDate = new GeneratedDate(date, `${this.name} years`, oddity)
            genDate.setHelpText(`orbits of ${this.name} around the sun`)
            genDate.addTags(PeriodGenerator.MONTHISH)
            genDate.addTags(this.name)
            return genDate
        }
        return new PeriodGenerator(fnc)
    }
    getDayCalculation(oddity) {
        const fnc = (now, number) => {
            const date = new Date(now)
            date.setTime(now.getTime() + Number(number) * this.dayNightCycleTime * 1000)

            const genDate = new GeneratedDate(date, `${this.name} days`, oddity)
            genDate.setHelpText(`day-night cycles as seen on ${this.name}`)
            genDate.addTags(PeriodGenerator.DAYISH)
            genDate.addTags(this.name)
            return genDate
        }
        return new PeriodGenerator(fnc)
    }
    // getConstellationCalculation() {
    //     const fnc = (now, number) => {
    //         const date = new Date(now)
    //         date.setTime(now.getTime() + Number(number) * this.earthConstellationTime * 1000)
    //         return date
    //     }
    //     const help = `${this.name} and earth are in the same relation to one another`
    // }
}

// @see https://ssd.jpl.nasa.gov/?planet_phys_par
const mercury = new Celestial("mercury", 58.6462 * days, 0.2408467 * years)
const venus = new Celestial("venus", -243.018 * days, 0.61519726 * years)
const mars = new Celestial("mars", 1.02595676 * days, 1.8808476 * years)
const jupiter = new Celestial("jupiter", 0.41354 * days, 11.862615 * years)
const saturn = new Celestial("saturn", 0.44401 * days, 29.447498 * years)
const uranus = new Celestial("uranus", -0.71833 * days, 84.016846 * years)
const neptune = new Celestial("neptune", 0.67125 * days, 164.79132 * years)

const mercuryDays = mercury.getDayCalculation(1.5)
const mercuryYears = mercury.getOrbitCalculation(1.5)
// const mercuryRotations = mercury.getSiderealCalculation()
// const mercuryConstellation = mercury.getConstellationCalculation()
const venusDays = venus.getDayCalculation(1.2)
const venusYears = venus.getOrbitCalculation(1.2)
const marsDays = mars.getDayCalculation(1.1)
const marsYears = mars.getOrbitCalculation(1.1)
const jupiterDays = jupiter.getDayCalculation(1.5)
const jupiterYears = jupiter.getOrbitCalculation(1.5)
const saturnDays = saturn.getDayCalculation(1.5)
const saturnYears = saturn.getOrbitCalculation(1.5)
const uranusDays = uranus.getDayCalculation(2)
const uranusYears = uranus.getOrbitCalculation(2)
const neptuneDays = neptune.getDayCalculation(2)
const neptuneYears = neptune.getOrbitCalculation(2)

export {
    lunarMonths,
    lunarOrbits,
    mercuryDays,
    mercuryYears,
    // these periods are a bit too absurd for my taste for now
    // mercuryRotations,
    // mercuryConstellation,
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
}